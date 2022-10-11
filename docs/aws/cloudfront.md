---
title: CloudFront
---

https://aws.amazon.com/cloudfront

> CloudFront is not just a CDN. It's also an SSL offloader, Host: header rewriter, path prepender, geolocator, georestrictor, secure content gateway, http to https redirector, error page customizer, root page substituter, web application firewall, origin header injector, dynamic content gzipper, path-based multi-origin http request router, viewer platform identifier, DDoS mitigator, zone apex alias target... so don't get too hung up on "CDN" or on the fact that you're stacking one service in front of another -- CloudFront was designed, in large part, to complement S3. They each specialize in certain facets of storage and delivery. [source](https://stackoverflow.com/questions/35614734/supporting-https-url-redirection-with-a-single-cloudfront-distribution)

## CLI

CLI Reference: https://docs.aws.amazon.com/cli/latest/reference/cloudfront/index.html

Invalidate the edge caches:

`aws cloudfront create-invalidation --distribution-id <distribution-id> --paths '/*' [--profile <profile>]`

## Redirect www to non-www

With two S3 buckets:

- Cloudfront redirect www to naked domain with ssl [closed] - https://stackoverflow.com/questions/28675620/cloudfront-redirect-www-to-naked-domain-with-ssl
- Step 4: Configure your subdomain bucket for website redirect - https://docs.aws.amazon.com/AmazonS3/latest/userguide/website-hosting-custom-domain-walkthrough.html#root-domain-walkthrough-configure-redirect
- Supporting HTTPS URL redirection with a single CloudFront distribution - https://stackoverflow.com/questions/35614734/supporting-https-url-redirection-with-a-single-cloudfront-distribution
  - > what I ended up having to do was provision another distribution to sit in front of the www S3 bucket so it was accessible over HTTPS
- How to redirect non www to www in aws s3 bucket and cloudfront - https://stackoverflow.com/questions/37000416/how-to-redirect-non-www-to-www-in-aws-s3-bucket-and-cloudfront
- To consolidate www and non-www, should I use an A record in Route 53 or two CloudFront distributions? - https://stackoverflow.com/questions/68139979/to-consolidate-www-and-non-www-should-i-use-an-a-record-in-route-53-or-two-clou
- https://aws.amazon.com/blogs/aws/root-domain-website-hosting-for-amazon-s3/

With Lambda@Edge:

- Redirect www to non-www using CloudFront and Lambda@Edge - https://grrr.tech/posts/cloudfront-www-redirect/ - https://github.com/grrr-amsterdam/host-redirect-microservice
- Redirect www to non-www with S3/CloudFront without separate buckets - https://stackoverflow.com/questions/43427029/redirect-www-to-non-www-with-s3-cloudfront-without-seperate-buckets
- Redirecting non-www to www website in AWS CloudFront - Creates 2 CF distributions - Has an example of a request object - https://medium.com/@chrispointon/redirecting-non-www-to-www-website-in-aws-cloudfront-658d97764b42

## Lambda@Edge

https://aws.amazon.com/lambda/edge/

## CloudFront functions

https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html

Introducing CloudFront Functions – Run Your Code at the Edge with Low Latency at Any Scale - https://aws.amazon.com/blogs/aws/introducing-cloudfront-functions-run-your-code-at-the-edge-with-low-latency-at-any-scale/

## Add Headers

Use the [Mozilla Observatory ](https://observatory.mozilla.org/) to check if the headers are correct.

Adding HTTP headers to CloudFront responses - https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/adding-response-headers.html

https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/edge-functions.html

Adding HTTP Security Headers Using Lambda@Edge and Amazon CloudFront - https://aws.amazon.com/blogs/networking-and-content-delivery/adding-http-security-headers-using-lambdaedge-and-amazon-cloudfront/

Getting started with a secure static website - https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/getting-started-secure-static-website-cloudformation-template.html - https://github.com/aws-samples/amazon-cloudfront-secure-static-site
