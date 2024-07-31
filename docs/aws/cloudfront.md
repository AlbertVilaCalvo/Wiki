---
title: CloudFront
---

https://aws.amazon.com/cloudfront

> CloudFront is not just a CDN. It's also an SSL offloader, Host: header rewriter, path prepender, geolocator, georestrictor, secure content gateway, http to https redirector, error page customizer, root page substituter, web application firewall, origin header injector, dynamic content gzipper, path-based multi-origin http request router, viewer platform identifier, DDoS mitigator, zone apex alias target... so don't get too hung up on "CDN" or on the fact that you're stacking one service in front of another -- CloudFront was designed, in large part, to complement S3. They each specialize in certain facets of storage and delivery. [source](https://stackoverflow.com/questions/35614734/supporting-https-url-redirection-with-a-single-cloudfront-distribution)

7 things wrong with CloudFront - https://twitter.com/matthieunapoli/status/1546071002064592897

## CLI

CLI Reference: https://docs.aws.amazon.com/cli/latest/reference/cloudfront/index.html

Invalidate the edge caches:

`aws cloudfront create-invalidation --distribution-id <distribution-id> --paths '/*' [--profile <profile>]`

## Lambda@Edge vs CloudFront Functions

[source](https://aws.amazon.com/blogs/aws/introducing-cloudfront-functions-run-your-code-at-the-edge-with-low-latency-at-any-scale/)

**CloudFront Functions**

- Launched 2021
- 2018+ Edge Locations

> simple HTTP(s) request/response manipulations that can be executed by very short-lived functions. For these use cases, you need a flexible programming experience with the performance, scale, and cost-effectiveness that enable you to execute them on every request.

> a new serverless scripting platform that allows you to run lightweight JavaScript code at the 218+ CloudFront edge locations at approximately 1/6th the price of Lambda@Edge.

**Lambda@Edge**

- Launched 2017
- 13 Regional Edge Caches

> complex, compute-heavy operations that are executed when objects are not in the cache. We launched Lambda@Edge in 2017 to offer a fully programmable, serverless edge computing environment for implementing a wide variety of complex customizations. Lambda@Edge functions are executed in a regional edge cache (usually in the AWS region closest to the CloudFront edge location reached by the client). For example, when you’re streaming video or audio, you can use Lambda@Edge to create and serve the right segments on-the-fly reducing the need for origin scalability. Another common use case is to use Lambda@Edge and Amazon DynamoDB to translate shortened, user-friendly URLs to full URL landing pages.

## Lambda@Edge

https://aws.amazon.com/lambda/edge/

(Developer Guide) Customizing at the edge with Lambda@Edge - https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-at-the-edge.html

Announcement (Dec 2016): https://aws.amazon.com/blogs/aws/coming-soon-lambda-at-the-edge/

> inspection and alteration of HTTP headers, access control (requiring certain cookies to be present), device detection, A/B testing, expedited or special handling for crawlers or ‘bots, and rewriting user-friendly URLs to accommodate legacy systems. Many of these use cases require more processing and decision-making than can be expressed by simple pattern matching and rules.

Samples: https://github.com/orgs/aws-samples/repositories?q=lambda+edge&type=all&language=&sort=

## CloudFront Functions

(Developer Guide) Customizing at the edge with CloudFront Functions - https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html

Announcement (May 2021): Introducing CloudFront Functions – Run Your Code at the Edge with Low Latency at Any Scale - https://aws.amazon.com/blogs/aws/introducing-cloudfront-functions-run-your-code-at-the-edge-with-low-latency-at-any-scale/

Announcement (May 2021): Amazon CloudFront announces CloudFront Functions, a lightweight edge compute capability - https://aws.amazon.com/about-aws/whats-new/2021/05/cloudfront-functions/

FAQs: https://aws.amazon.com/cloudfront/faqs/

Samples: https://github.com/aws-samples/amazon-cloudfront-functions

### CLI

[List functions](https://docs.aws.amazon.com/cli/latest/reference/cloudfront/test-function.html): `aws cloudfront list-functions`

[Describe function](https://docs.aws.amazon.com/cli/latest/reference/cloudfront/describe-function.html): `aws cloudfront describe-function --name redirect-www-to-apex [--stage LIVE]`

### Event types

- viewer request: triggered after CloudFront receives a request from a viewer
- viewer response: before CloudFront forwards the response to the viewer

### `event` example

```json
{
  "version": "1.0",
  "context": {
    "distributionDomainName": "d123.cloudfront.net",
    "distributionId": "E123",
    "eventType": "viewer-request",
    "requestId": "4TyzHTaYWb1sHhEqV6GX1qTfHUDd_BzoBZnwfnvQc_1oF26ClkoUSEQ=="
  },
  "viewer": {
    "ip": "1.2.3.4"
  },
  "request": {
    "method": "GET",
    "uri": "/index.html",
    "querystring": {},
    "headers": {},
    "cookies": {}
  }
}
```

## Redirect www to non-www

### With two S3 buckets

- Cloudfront redirect www to naked domain with ssl [closed] - https://stackoverflow.com/questions/28675620/cloudfront-redirect-www-to-naked-domain-with-ssl
- Step 4: Configure your subdomain bucket for website redirect - https://docs.aws.amazon.com/AmazonS3/latest/userguide/website-hosting-custom-domain-walkthrough.html#root-domain-walkthrough-configure-redirect
- Supporting HTTPS URL redirection with a single CloudFront distribution - https://stackoverflow.com/questions/35614734/supporting-https-url-redirection-with-a-single-cloudfront-distribution
  - > what I ended up having to do was provision another distribution to sit in front of the www S3 bucket so it was accessible over HTTPS
- How to redirect non www to www in aws s3 bucket and cloudfront - https://stackoverflow.com/questions/37000416/how-to-redirect-non-www-to-www-in-aws-s3-bucket-and-cloudfront
- To consolidate www and non-www, should I use an A record in Route 53 or two CloudFront distributions? - https://stackoverflow.com/questions/68139979/to-consolidate-www-and-non-www-should-i-use-an-a-record-in-route-53-or-two-clou
- https://aws.amazon.com/blogs/aws/root-domain-website-hosting-for-amazon-s3/

### With Lambda@Edge

- Redirect www to non-www using CloudFront and Lambda@Edge (2019) - https://grrr.tech/posts/cloudfront-www-redirect/ - https://github.com/grrr-amsterdam/host-redirect-microservice
- Redirect www to non-www with S3/CloudFront without separate buckets - https://stackoverflow.com/questions/43427029/redirect-www-to-non-www-with-s3-cloudfront-without-seperate-buckets
- Redirecting non-www to www website in AWS CloudFront (2018) - Creates 2 CF distributions - Has an example of a request object - https://medium.com/@chrispointon/redirecting-non-www-to-www-website-in-aws-cloudfront-658d97764b42

### With CloudFront Functions

- https://stackoverflow.com/a/67460691/4034572
- https://stackoverflow.com/a/73102646/4034572
- https://github.com/aws-samples/amazon-cloudfront-functions/tree/main/redirect-based-on-country

```js
/**
 * Redirects www.example.com to example.com.
 * This function is for a 'viewer request' event trigger.
 *
 * Inspired by:
 * - https://stackoverflow.com/a/67460691/4034572
 * - https://stackoverflow.com/a/73102646/4034572
 * - https://github.com/aws-samples/amazon-cloudfront-functions/tree/main/redirect-based-on-country
 */
function handler(event) {
  var request = event.request
  if (!request.headers.host) {
    return request
  }
  var host = request.headers.host.value
  if (host.startsWith('www.')) {
    var apexHost = host.slice(4) // 'www.example.com' → 'example.com'
    var newUrl = `https://${apexHost}${request.uri}`
    var response = {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: { value: newUrl },
      },
    }
    return response
  }
  return request
}
```

Steps:

- Go to the CloudFront console → Functions. Click 'Create function'.
- Set Name to redirect-www-to-apex and Description to "Redirect www.example.com to example.com". Click 'Create function'.
- Paste the function code at the 'Build' tab.
- You can optionally test the function at the console or with the command `aws cloudfront test-function --if-match <ETag> --name redirect-www-to-apex --event-object fileb://<path>/with-www.json`. To get the ETag, use `aws cloudfront describe-function --name redirect-www-to-apex [--stage DEVELOPMENT/LIVE]`.
- At the 'Publish' tab, click 'Publish function'.
- At the 'Publish' tab, section 'Associated distributions', click 'Add association'. Select the Distribution from the dropdown. Set 'Event type' to 'Viewer Request' and 'Cache behavior' to 'Default (\*)'. Click 'Add association'. The distribution will appear at the list of 'Associated distributions'.

## Add Headers

Use the [MDN HTTP Observatory](https://developer.mozilla.org/en-US/observatory) to check if the headers are correct. Note that the HTTP Observatory is for websites, not APIs [source](https://developer.mozilla.org/en-US/blog/mdn-http-observatory-launch/#can_i_scan_non-websites_such_as_api_endpoints)

Adding HTTP headers to CloudFront responses - https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/adding-response-headers.html

https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/edge-functions.html

### With Lambda@Edge

- Adding HTTP Security Headers Using Lambda@Edge and Amazon CloudFront (2017) - https://aws.amazon.com/blogs/networking-and-content-delivery/adding-http-security-headers-using-lambdaedge-and-amazon-cloudfront/
- Getting started with a secure static website - https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/getting-started-secure-static-website-cloudformation-template.html - https://github.com/aws-samples/amazon-cloudfront-secure-static-site

### With CloudFront Functions

- https://github.com/aws-samples/amazon-cloudfront-functions
