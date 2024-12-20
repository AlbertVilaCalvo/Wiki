---
title: CloudWatch
---

https://aws.amazon.com/cloudwatch

To monitor services. The services send metrics to CloudWatch, and you can create alarms based on metrics.

Is a regional service.

Utilization Saturation and Errors (USE) Method - https://www.brendangregg.com/usemethod.html

:::info
CPU utilization usually gets problematic when crossing 80–90%, because the wait time explodes.

On a supermarket, the wait time for your customers is very high when your cashiers are used for 90% of the day, because customers don’t arrive at the same time at the queue.

**Wait time is exponential to the utilization of a resource.**

When you go from 0% utilization to 60%, wait time doubles. When you go to 80%, wait time has tripled. When you to 90%, wait time is six times higher, and so on. If your wait time is 100 ms during 0% utilization, you already have 300 ms wait time during 80% utilization, which is already slow for an e-commerce website.

(From AWS in Action p. 319.)
:::

## Learning resources

(Packt) Infrastructure Monitoring with Amazon CloudWatch - https://www.packtpub.com/product/infrastructure-monitoring-with-amazon-cloudwatch/9781800566057 - https://github.com/PacktPublishing/Infrastructure-Monitoring-with-Amazon-CloudWatch - https://www.youtube.com/playlist?list=PLeLcvrwLe186RQpGRXrruQ-zWFPYrFS5E

CloudTrail - https://mng.workshop.aws/cloudtrail/insights.html

https://workshops.aws/categories/Amazon%20CloudWatch
