---
title: EC2 Auto Scaling
---

https://docs.aws.amazon.com/autoscaling/

EC2 Auto Scaling - https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html

https://digitalcloud.training/amazon-ec2-auto-scaling/

Tutorial - https://aws.amazon.com/tutorials/ec2-auto-scaling-spot-instances

Provides scalability and elasticity by scaling out (horizontally, instead of up/vertically) by launching instances when demand increases, so that the application is performant, and scaling in by terminating instances when they are not needed, so that you only pay for what you need.

In addition, with Auto Scaling you can achieve high availability. EC2 instances run on a single availability zone, but with Auto Scaling you can fail over into another AZ if there's an outage in one AZ.

AutoSpotting - https://autospotting.io - https://github.com/LeanerCloud/AutoSpotting

## Auto Scaling Group

Responds to EC2 status checks and CloudWatch metrics.

Deleting it terminates the instances.

## Scaling Policies

Is set on the ASG, at the 'Automatic scaling' tab.

Can be dynamic (target, step and simple), predictive and scheduled.

[Target tracking scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html) – Select a CloudWatch metric and a target value (eg average CPU utilization of 50%).

[Step scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-simple-step.html) – Scale a resource based on a set of scaling adjustments that vary based on the size of the alarm breach.

> We strongly recommend that you use target tracking scaling policies to scale on metrics like average CPU utilization or average request count per target.

[Simple scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-simple-step.html)

[Scheduled scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-scheduled-scaling.html) – Scale a resource one time only or on a recurring schedule.

## Launch template

https://docs.aws.amazon.com/autoscaling/ec2/userguide/launch-templates.html

A blueprint used by the Auto Scaling group to launch virtual machines. Similar to an instance launch configuration (which includes the AMI, instance type, key pair, security groups etc.), but can be **versioned**.

https://stackoverflow.com/questions/61981663/what-is-the-difference-between-aws-asg-launch-templates-and-launch-configuration

:::info
For accounts created after May 31, 2023, the EC2 console **only supports creating Auto Scaling groups with launch templates**. Creating Auto Scaling groups with launch configurations is not recommended but still available via the CLI and API until December 31, 2023. (This message appears when you are creating an Auto Scaling Group.)
:::

## Health check types

https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-health-checks.html

- EC2: uses the VM hypervisor and networking.
- ELB (Elastic Load Balancing): checks if the application works too.

https://stackoverflow.com/questions/42466157/whats-the-difference-between-elb-health-check-and-ec2-health-check

https://tutorialsdojo.com/ec2-instance-health-check-vs-elb-health-check-vs-auto-scaling-and-custom-health-check

https://digitalcloud.training/aws-health-checks-elb-vs-alb-vs-auto-scaling

The health check _type_ is defined in the Auto Scaling group, not the load balancer target group. See the Terraform resource [`aws_autoscaling_group`](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/autoscaling_group) (attribute [`health_check_type`](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/autoscaling_group#health_check_type-1)), or the CloudFormation resource [`AutoScalingGroup`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-autoscalinggroup.html), (attribute [`HealthCheckType`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-autoscalinggroup.html#cfn-autoscaling-autoscalinggroup-healthchecktype)). In addition to the type, if the health check is of type ELB, you define the path/protocol/status code/etc at the target group; see this [example in Terraform](https://github.com/brikis98/terraform-up-and-running-code/blob/27a3beaf842dbe2a582e29f64373dfb793374ba8/code/terraform/02-intro-to-terraform-syntax/webserver-cluster/main.tf#L98-L115) or this [example in CloudFormation](https://github.com/AWSinAction/code3/blob/73576c36857494a1dbf1d4e46c9d3bdfdaed54ac/chapter14/loadbalancer.yaml#L158-L171).

## Elastic Load Balancing

https://aws.amazon.com/elasticloadbalancing

Distribute network traffic among targets (EC2 instances, lambda functions, containers...), providing fault tolerance. You can couple this with Auto Scaling to ensure the right number of instances are available.

Uses health checks to ensure that an instance is available and healthy. Does not use CloudWatch metrics.

ELB distributes traffic in a single or multiple availability zones, but cannot distribute across regions. To direct traffic across regions use Amazon Route 53.

A load balancer consists of multiple servers that can run in different subnets (ie datacenters). AWS automatically scales the number of load balancer servers up and down based on traffic and handles failover if a server goes down, so you get scalability and high availability. (From 'Terraform: Up and Running' p. 72.)

:::info Important
Place the EC2 instances in private subnets (so they aren't directly accessible from the public internet) and the ALBs in public subnets (so users can access them directly).

See [Place your servers in private subnets, and load balancers in public subnets](/aws/vpc#place-your-servers-in-private-subnets-and-load-balancers-in-public-subnets).
:::

:::info
Load balancers can be used with more than web servers—you can use load balancers in front of any systems that deal with request/response-style communication, as long as the protocol is based on TCP.
(AWS in Action p.394)
:::

### Load balancer types

https://docs.aws.amazon.com/autoscaling/ec2/userguide/autoscaling-load-balancer.html#integrations-aws-elastic-load-balancing-types

https://aws.amazon.com/elasticloadbalancing/features/#Product_comparisons

- [Application Load Balancer (ALB)](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html): application layer 7, HTTP/HTTPS. Supports routing based on the request HTTP headers, URL path, host (ie domain name) and query params, IP address etc.
- [Network Load Balancer (NLB)](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html): layer 4, TCP/UDP. Routes based on the protocol, source or destination IP address etc. Can scale up and down in response to load faster than the ALB. Scales to tens of milions of requests per second.
- [Classic Load Balancer (CLB)](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/introduction.html): layer 4 and 7. Has far fewer features than ALB and NLB. Deprecated; should not be used. See "Benefits of migrating from a Classic Load Balancer" [to ALB](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html#application-load-balancer-benefits) and [to NLB](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html#network-load-balancer-benefits).

### Load balancer components

See example in Terraform at https://github.com/brikis98/terraform-up-and-running-code/blob/master/code/terraform/02-intro-to-terraform-syntax/webserver-cluster/main.tf

- Load balancer: defines configuration like the load balancer type (application, network), the subnets etc. See [CreateLoadBalancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/APIReference/API_CreateLoadBalancer.html).
- Listener: defines the port (80, 443) and protocol (HTTP, HTTPS, TCP, TLS, UDP), the default action if no rule matches the request etc. See [CreateListener](https://docs.aws.amazon.com/elasticloadbalancing/latest/APIReference/API_CreateListener.html).
- Target group: forwards the requests to the registered targets. Defines the periodic health check, the port and protocol on which the targets receive traffic, and the target type (EC2 instance, IP, Lambda). See [CreateTargetGroup](https://docs.aws.amazon.com/elasticloadbalancing/latest/APIReference/API_CreateTargetGroup.html).
- Listener rule (optional): chooses the target group to forward the requests to, based on path or host. See [CreateRule](https://docs.aws.amazon.com/elasticloadbalancing/latest/APIReference/API_CreateRule.html) and [RuleCondition](https://docs.aws.amazon.com/elasticloadbalancing/latest/APIReference/API_RuleCondition.html).

Usually the EC2 instances are managed by an Auto Scaling group, which registers and deregisters the EC2 instances at the load balancer’s target group automatically.

![Load balancer](/img/AWS-load-balancer.png 'Load balancer')

## Target group

Routes the requests to the targets (eg EC2 instances) and does health checks.

https://stackoverflow.com/questions/48529074/how-is-target-groups-different-from-auto-scaling-groups-in-aws

## Setup with an Application Load Balancer

Create Auto Scaling groups using launch templates - https://docs.aws.amazon.com/autoscaling/ec2/userguide/create-auto-scaling-groups-launch-template.html

Tutorial: Create your first Auto Scaling group - https://docs.aws.amazon.com/autoscaling/ec2/userguide/create-your-first-auto-scaling-group.html

Tutorial: Set up a scaled and load-balanced application - https://docs.aws.amazon.com/autoscaling/ec2/userguide/tutorial-ec2-auto-scaling-load-balancer.html

Start by creating a launch template. Go to EC2 → Launch templates (under Instances), and click 'Create launch template'. Give it a name, and select the Amazon Linux AMI. Select the instance type (eg t2.micro). At 'Network settings', select a security group with HTTP access from anywhere (0.0.0.0/0). You can optionally add user data.

Then create the Auto Scaling Group. Go to EC2 → Auto Scaling Groups, and click 'Create Auto Scaling group'. Give it a name and select the Launch template just created. Select the default VPC. Select multiple subnets, this way instances are placed in different availability zones.

After creating the group, go to your ASG. In a few minutes the instances will be running. They should be running in different availability zones (you can check this at the 'Instance management' tab).

To add a load balancer, go to EC2 → Target Groups (under Load Balancing) and click 'Create target group'. Target type should be Instances (the default). Give it a name. We can set a health check path. Click Next and on Available instances select the instances and click 'Include as pending below'. Finally click 'Create target group'.

The Target group is not yet attached to a load balancer. To create a load balancer, go to EC2 → Load Balancers (under Load Balancing) and click 'Creat load balancer'. Choose Application Load Balancer. Give it a name. Select the availability zones selected earlier when choosing the subnets of the Auto Scaling group. Select the security group. In 'Listeners and routing' select the target grup just created.

Go to the Auto Scaling group. You'll see that 'Load balancing' is not set, so new instances launched won't be added to the target group. We need to add the load balancer so that request are distributed among instances. On 'Load balancing' click Edit. Choose 'Application, Network or Gateway Load Balancer target groups' and select the target group and click Update.

Go to the Target group. The instance's 'Health status' should be Healthy. You can now go to the Load balancer, copy the 'DNS name' and open it on a browser.

To test that new instances are started automatically, use `aws ec2 terminate-instances --instance-ids i-0fcf8a7cbc5d88d6b`.

## CLI

https://docs.aws.amazon.com/cli/latest/reference/autoscaling

Scale the number of instances in your ASG:

```shell
aws autoscaling set-desired-capacity --auto-scaling-group-name my-auto-scaling-group --desired-capacity 2
```

## API

https://docs.aws.amazon.com/autoscaling/ec2/APIReference/Welcome.html
