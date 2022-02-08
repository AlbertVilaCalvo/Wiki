---
title: IAM
---

Identity and Access Management

https://docs.aws.amazon.com/iam/index.html

FAQs: https://aws.amazon.com/iam/faqs/

- User: an individual, system, or application requiring access to AWS services.
- Group: collection of users. A user can be in many groups.
- Role: set of permissions.
- Policy: JSON file. Permissions assigned to a user, group or role.

https://stackoverflow.com/questions/46199680/difference-between-iam-role-and-iam-user-in-aws

https://classroom.udacity.com/nanodegrees/nd0044/parts/8fc72c65-158a-429d-a08f-f25b8b66e99f/modules/769586dd-1c0b-4155-af83-853bc9fa7fdc/lessons/e21110af-9970-4f3c-b1ad-c8cc4f27df39/concepts/ee39a09f-e9c3-48db-93c7-d773f07bb6aa

## Finding your AWS account ID

https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html#FindingYourAWSId

`aws sts get-caller-identity`

## Policy

JSON file. Permissions assigned to a user, group or role.

Console: https://console.aws.amazon.com/iamv2/home?#/policies

Simulator: https://policysim.aws.amazon.com

Examples: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_examples.html

## CLI

`aws iam list-users`

`aws iam list-users --profile <profile-name>`

Create role
- https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/create-role.html
- `aws iam create-role --role-name UdacityFlaskDeployCBKubectlRole --assume-role-policy-document file://trust.json --output text --query 'Role.Arn'`

Attach a Policy to a IAM role
- https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/put-role-policy.html
- `aws iam put-role-policy --role-name UdacityFlaskDeployCBKubectlRole --policy-name eks-describe --policy-document file://iam-role-policy.json`

Delete role
- https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_manage_delete.html
- First remove the role from instance profile: `aws iam remove-role-from-instance-profile --instance-profile-name instance-profile-name --role-name role-name`
- Then remove the role: `aws iam delete-role --role-name role-name`
- If you get the error "Cannot delete entity, must remove roles from instance profile first" on the console when trying to delete a role, use the CLI instead.