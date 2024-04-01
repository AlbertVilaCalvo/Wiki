---
title: EC2 Auto Scaling
---

https://docs.aws.amazon.com/autoscaling/

EC2 Auto Scaling - https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html

https://digitalcloud.training/amazon-ec2-auto-scaling/

Tutorial - https://aws.amazon.com/tutorials/ec2-auto-scaling-spot-instances

Provides scalability and elasticity by scaling out (horizontally, instead of up/vertically) by launching instances when demand increases, so that the application is performant, and scaling in by terminating instances when they are not needed, so that you only pay for what you need.

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

Similar to an instance launch configuration (which includes the AMI, instance type, key pair, security groups etc.), but can be versioned.

https://stackoverflow.com/questions/61981663/what-is-the-difference-between-aws-asg-launch-templates-and-launch-configuration

:::info
For accounts created after May 31, 2023, the EC2 console only supports creating Auto Scaling groups with launch templates. Creating Auto Scaling groups with launch configurations is not recommended but still available via the CLI and API until December 31, 2023. (This message appears when you are creating an Auto Scaling Group.)
:::

## Target group

https://stackoverflow.com/questions/48529074/how-is-target-groups-different-from-auto-scaling-groups-in-aws

## Elastic Load Balancing

https://aws.amazon.com/elasticloadbalancing

Distribute network traffic among targets (EC2 instances, lambda functions, containers...), providing fault tolerance. You can couple this with Auto Scaling to ensure the right number of instances are available.

Uses health checks to ensure that an instance is available and healthy. Does not use CloudWatch metrics.

ELB distributes traffic in a single or multiple availability zones, but cannot distribute across regions. To direct traffic across regions use Amazon Route 53.

### ELB types

https://docs.aws.amazon.com/autoscaling/ec2/userguide/autoscaling-load-balancer.html#integrations-aws-elastic-load-balancing-types

https://aws.amazon.com/elasticloadbalancing/features/#Product_comparisons

- [Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html): application layer 7, HTTP/HTTPS. Supports routing based on the request HTTP headers, URL path, host (ie domain name) and query params, IP address etc.
- [Network Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html): layer 4, TCP/UDP. Routes based on the protocol, source or destination IP address etc.

## Setup

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
