---
title: ExternalDNS
---

https://github.com/kubernetes-sigs/external-dns

https://kubernetes-sigs.github.io/external-dns/latest/

FAQ - https://github.com/kubernetes-sigs/external-dns/blob/master/docs/faq.md

Helm chart - https://artifacthub.io/packages/helm/external-dns/external-dns

> ExternalDNS allows you to control DNS records dynamically via Kubernetes resources in a DNS provider-agnostic way.

ExternalDNS has direct access to your DNS provider.
It creates records based on annotations on Services and Ingresses.
This way you avoid using \* wildcard records.
It cleans up records when Services or Ingresses are deleted.

Docs:

- AWS Tutorial - https://github.com/kubernetes-sigs/external-dns/blob/master/docs/tutorials/aws.md
- ExternalDNS with AWS Load Balancer Controller - https://github.com/kubernetes-sigs/external-dns/blob/master/docs/tutorials/aws-load-balancer-controller.md
- AWS filters - https://kubernetes-sigs.github.io/external-dns/latest/docs/tutorials/aws-filters/

> ExternalDNS allows you to keep selected zones (via `--domain-filter`) synchronized with Ingresses and Services of `type=LoadBalancer` [source](https://github.com/kubernetes-sigs/external-dns/blob/d38daef2a6be64a0eae26df9f981e42dc6633367/README.md?plain=1#L42)

> We strongly encourage you to set `--txt-owner-id` to a unique value that doesn't change for the lifetime of your cluster. [source](https://github.com/kubernetes-sigs/external-dns/blob/d38daef2a6be64a0eae26df9f981e42dc6633367/README.md?plain=1#L71)

> Since v0.3, ExternalDNS can be configured to use an ownership registry. When this option is enabled, ExternalDNS will keep track of which records it has control over, and will never modify any records over which it doesn't have control. This is a fundamental requirement to operate ExternalDNS safely when there might be other actors creating DNS records in the same target space.
>
> For now ExternalDNS uses TXT records to label owned records, and there might be other alternatives coming in the future releases. [source](https://github.com/kubernetes-sigs/external-dns/blob/d38daef2a6be64a0eae26df9f981e42dc6633367/docs/faq.md?plain=1#L98-L100)

At the IAM policy, we can use Condition keys for the Action [`ChangeResourceRecordSets`](https://docs.aws.amazon.com/Route53/latest/APIReference/API_ChangeResourceRecordSets.html):

- https://github.com/kubernetes-sigs/external-dns/blob/master/docs/tutorials/aws.md#iam-policy
- https://github.com/kubernetes-sigs/external-dns/blob/master/docs/tutorials/aws-sd.md#iam-permissions-with-abac
- https://docs.aws.amazon.com/service-authorization/latest/reference/list_amazonroute53.html

## Example

Configure a domain (`api.recipemanager.link`, no AAAA records) on a Ingress to point to an Application Load Balancer with an ACM SSL/TLS Certificate with:

- `--source=ingress`
- `--txt-prefix=externaldns-`
- `--txt-owner-id=recipe-manager-eks-dev`

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: recipe-manager-api
  namespace: recipe-manager
  labels:
    app: recipe-manager
  annotations:
    # ExternalDNS annotation to create Route53 A record for the API domain to the ALB
    external-dns.alpha.kubernetes.io/hostname: api.recipemanager.link
```

ExternalDNS creates two records in Route53, an A record and a TXT record:

| Record name                                               | Type  | Routing | Alias | Value/Route traffic to                                                                                                            | TTL (seconds) |
| --------------------------------------------------------- | ----- | ------- | ----- | --------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| api.recipemanager.link                                    | A     | Simple  | Yes   | recipe-manager-api-lb-dev-1822519741.us-east-1.elb.amazonaws.com.                                                                 | -             |
| \_3c98e5370cf62060b81f5bd17eafc052.api.recipemanager.link | CNAME | Simple  | No    | \_3322ee2e90f17275c5faac39c491ac49.jkddzztszm.acm-validations.aws.                                                                | 60            |
| externaldns-cname-api.recipemanager.link                  | TXT   | Simple  | No    | "heritage=external-dns,external-dns/owner=recipe-manager-eks-dev,external-dns/resource=ingress/recipe-manager/recipe-manager-api" | 300           |

The TXT record is used by ExternalDNS to track ownership of the DNS records it manages. If you create the A record without ExternalDNS, then you have only the A record, not the TXT.

The CNAME record is used for ACM certificate validation, ExternalDNS does not create it, we need to create it.
