---
title: CloudFormation
---

https://aws.amazon.com/cloudformation/

Docs: https://docs.aws.amazon.com/cloudformation/index.html

https://github.com/aws-cloudformation

:::tip
The Quick Starts page contains many CloudFormation templates ready to use: https://aws.amazon.com/quickstart
:::

https://github.com/donnemartin/awesome-aws#cloudformation

Validate Infrastructure-as-code (IaC) or infrastructure/service compositions such as CloudFormation Templates, CloudFormation ChangeSets, Terraform JSON configuration files, Kubernetes configurations - https://github.com/aws-cloudformation/cloudformation-guard

Static analysis to find misconfigurations and vulnerabilities - https://www.checkov.io - https://github.com/bridgecrewio/checkov

https://github.com/Sceptre/sceptre - https://docs.sceptre-project.org

Linter: https://github.com/aws-cloudformation/cfn-lint

Test AWS CloudFormation templates - https://github.com/aws-ia/taskcat - https://aws-ia.github.io/taskcat

https://github.com/cloudtools/troposphere - Python library to create AWS CloudFormation descriptions

Generate CloudFormation / Terraform / Troposphere templates from your existing AWS resources - https://github.com/iann0036/former2

CloudFormation vs Terraform in 2022 - https://cloudonaut.io/cloudformation-vs-terraform

Declarative: you define the end state of your infrastructure, and CloudFormation figures out how to achieve it.

Think of a template as a class, and a stack as an object. The template exists only once, whereas many stacks can be created from the same template. (AWS in Action p. 128)

Never store sensitive information (such as credentials and access keys) in a template file.

A stack can be created using the console or the CLI.

:::info Important
The AMI ID is region-specific, that is, the AMI ID of the latest Amazon Linux is different in us-east-1 and us-west-1. Is important to set the right value in CloudFormation templates.
:::

## Pros and cons

What is AWS Cloudformation? Pros and Cons? - https://www.youtube.com/watch?v=0Sh9OySCyb4

From "Moving away from CDK" - https://sst.dev/blog/moving-away-from-cdk

> CloudFormation stacks have resource limits. Meaning that if you have more than 500 resources in a stack, you need to move them out to a new stack. This happens with larger teams. They’ll need to refactor their stacks often. (...) When you deploy an app with these two stacks, you’ll get a different cyclical dependency error. Here CloudFormation cannot deploy this because these stacks depend on each other.

> A consequence of CloudFormation being a black box is that it handles any errors internally. So you’ll see the error from CloudFormation as opposed to the underlying error with the resource. This is the reason why many AWS deployment errors are cryptic and vague.

> CDK supports multi-region deployments. But it does this via a Custom Resource. The problem is that CloudFormation is a single-region service. There’s no way to link stacks across regions. So when you deploy stacks across regions you’ll rely on Custom Resources to share references across them.

## Learn

https://mng.workshop.aws/cloudformation.html

https://www.udacity.com/course/deploy-infrastructure-as-code--cd12352

## Sample templates

- https://aws.amazon.com/cloudformation/resources/templates
- AWS and AWS Partners - https://aws.amazon.com/solutions/
- (AWS in Action) https://github.com/widdix/aws-cf-templates - https://templates.cloudonaut.io/en/stable/
  - Also see https://github.com/cfn-modules/docs/tree/master/examples
- Static site S3 CloudFront - https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/getting-started-secure-static-website-cloudformation-template.html - https://github.com/aws-samples/amazon-cloudfront-secure-static-site
- VPC with ASG and ALB - https://github.com/elhadjibarry/aws-iac-cloudformation

## Template sections

https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-anatomy.html

All sections are optional except `Resources`. The order of the sections does not matter.

<!-- prettier-ignore -->
```yaml
AWSTemplateFormatVersion: 2010-09-09

Description: >
  Here are some details about
  the template.

Parameters:
  InstanceType:
    Type: String
    Default: t2.micro
    AllowedValues:
      - t2.micro
      - m1.small
      - m1.large
    Description: Enter t2.micro, m1.small, or m1.large. Default is t2.micro.

Resources:
  MyEC2Instance:
    Type: "AWS::EC2::Instance"
    Properties:
      ImageId: "ami-0ff8a91507f77f867"

Outputs:
  StackVPC:
    Description: The ID of the VPC
    Value: !Ref MyVPC
    Export:
      Name: !Sub "${AWS::StackName}-VPCID"
```

Format version `AWSTemplateFormatVersion`

- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/format-version-structure.html
- The only valid value is `2010-09-09`
- It's optional. If omitted, _CloudFormation assumes the latest template format version_

:::warning
Always specify `AWSTemplateFormatVersion: 2010-09-09`. Otherwise, CloudFormation will use whatever version is the latest one, which can cause problems if new versions are introduced.
:::

Description

- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-description-structure.html
- String between 0 and 1024 bytes
- Displayed on the console
- Optional but recommended

Parameters

- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html
- Like variables. Used to avoid hardcoding values and make the template reusable
- Set when the stack is created
- Used in `Resources` and `Outputs` sections
- The `Type` field is required, the rest are optional
- You can optionally add the following [properties](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html#parameters-section-structure-properties): `AllowedPattern`, `AllowedValues`, `ConstraintDescription`, `Default`, `Description`, `MinLength`, `MaxLength`, `MinValue`, `MaxValue` and `NoEcho`

Resources

- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/resources-section-structure.html
- Required
- The `Type` is required. Some of the `Properties` are required, others optionals
- Properties depend on the resource type
- Full list of supported resource types: [AWS resource and property types reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html)

Outputs

- https://docs.aws.amazon.com/AWSCloudFormation/l atest/UserGuide/outputs-section-structure.html
- Resources that you can reuse in other stacks
- View them with `aws cloudformation describe-stacks`
- Use [`ImportValue`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-importvalue.html) to get the value exported by another stack

Metadata

- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

## Intrinsic functions

https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-sub.html

## EC2 user data

`Fn::Base64` docs: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-base64.html

```yaml
Resources:
  Instance:
    Type: 'AWS::EC2::Instance'
    Properties:
      UserData: !Base64 |
        #!/bin/bash -ex
        yum -y update
```

```yaml
Resources:
  Instance:
    Type: 'AWS::EC2::Instance'
    Properties:
      UserData:
        'Fn::Base64': !Sub |
          #!/bin/bash -ex
          /opt/aws/bin/cfn-signal -e 0 --stack ${AWS::StackName} --resource Instance --region ${AWS::Region}
```

## CLI

CLI Reference:

- v2: https://docs.aws.amazon.com/cli/latest/reference/cloudformation/index.html
- v1: https://docs.aws.amazon.com/cli/latest/reference/cloudformation/index.html

[Create stack](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/create-stack.html):

```shell
aws cloudformation create-stack --stack-name myStackName --region us-east-1 --template-body file://myTemplate.yml
```

```shell
aws cloudformation create-stack --stack-name myStackName \
 --template-url https://s3.amazonaws.com/bucket/folder/template.yaml \
 --capabilities CAPABILITY_IAM
```

To check if the stack creation has completed, run `aws cloudformation describe-stacks --stack-name myStackName` and check if `StackStatus` is `CREATE_COMPLETE`.

[Update stack](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/update-stack.html):

```shell
aws cloudformation update-stack --stack-name myStackName --region us-east-1 --template-body file://myTemplate.yml
```

```shell
aws cloudformation update-stack --stack-name myStackName --template-url https://s3.amazonaws.com/bucket/folder/template.yaml --capabilities CAPABILITY_IAM
```

Update a stack reusing a previous parameter value:

```shell
aws cloudformation update-stack --stack-name myStackName \
 --template-url https://s3.amazonaws.com/bucket/folder/template.yaml \
 --parameters ParameterKey=SomeParameter,UsePreviousValue=true  \
 --capabilities CAPABILITY_IAM
```

[List stacks](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/list-stacks.html):

```shell
aws cloudformation list-stacks
aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE UPDATE_COMPLETE
```

[Describe stack](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/describe-stacks.html):

```shell
aws cloudformation describe-stacks --stack-name myStackName
```

Get stack outputs:

```shell
aws cloudformation describe-stacks --stack-name myStackName --query "Stacks[0].Outputs"
```

```shell
aws cloudformation describe-stacks --stack-name myStackName --query "Stacks[0].Outputs[0].OutputValue" --output text
```

[Delete stack](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/delete-stack.html):

```shell
aws cloudformation delete-stack --stack-name myStackName
```

[Wait for stack deletion](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/wait/stack-delete-complete.html):

```shell
aws cloudformation wait stack-delete-complete --stack-name myStackName
```

[Get stack resources](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/describe-stack-resources.html) (only the first 100):

```shell
aws cloudformation describe-stack-resources --stack-name myStackName
```

[Get stack resource](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/describe-stack-resource.html):

```shell
aws cloudformation describe-stack-resource --stack-name myStackName \
 --logical-resource-id Bucket
```

```shell
aws cloudformation describe-stack-resource --stack-name imagery \
 --logical-resource-id Bucket \
 --query "StackResourceDetail.PhysicalResourceId" \
 --output text
```

### Deploy Lambda function with SAM

From AWS in Action p. 198. Source code: https://github.com/AWSinAction/code3/tree/main/chapter06

The Serverless Application Model (SAM) enables you to deploy a Lambda function in an automated way with AWS CloudFormation.

On the terminal, navigate to the folder with a CloudFormation template named `template.yaml` and a Lambda function `lambda_function.py`.

We need to create a S3 bucket first (`$ aws s3 mb s3://my-bucket`). Then we create a deployment package and we upload it to S3:

```shell
aws cloudformation package --template-file template.yaml \
  --s3-bucket my-bucket --output-template-file output.yaml
```

Then we deploy the Lambda function:

```shell
aws cloudformation deploy --stack-name my-stack \
  --template-file output.yaml --capabilities CAPABILITY_IAM
```

## Quick-create links

https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-console-create-stacks-quick-create-links.html

For example: https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?templateURL=https://s3.amazonaws.com/awsinaction-code3/chapter05/ec2-os-update.yaml&stack-Name=ec2-os-update
