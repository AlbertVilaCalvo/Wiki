---
title: CloudFormation
---

https://aws.amazon.com/cloudformation/

Docs: https://docs.aws.amazon.com/cloudformation/index.html

Sample templates: https://aws.amazon.com/cloudformation/resources/templates/

Never store sensitive information (such as credentials and access keys) in a template file.

A stack can be created using the console or the CLI.

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
  InstanceTypeParameter:
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

Description

- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-description-structure.html
- String between 0 and 1024 bytes
- Displayed on the console

Paramters

- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html
- Like variables. Used to avoid hardcoding values and make the template reusable
- Set when the stack is created
- Used in `Resources` and `Outputs` sections
- The `Type` field is required, the rest are optional

Resources

- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/resources-section-structure.html
- Required
- Properties depend on the resource type

Outputs

- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/outputs-section-structure.html
- Resources that you can reuse in other stacks
- View them with `aws cloudformation describe-stacks`
- Use [`ImportValue`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-importvalue.html) to get the value exported by another stack

Metadata

- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

## Intrinsic functions

https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-sub.html

## CLI

Create stack: `aws cloudformation create-stack --stack-name myStackName --region us-east-1 --template-body file://myTemplate.yml`

Update stack: `aws cloudformation update-stack --stack-name myStackName --region us-east-1 --template-body file://myTemplate.yml`

Describe stack: `aws cloudformation describe-stacks --stack-name myStackName`

Delete stack: `aws cloudformation delete-stack --stack-name myStackName`
