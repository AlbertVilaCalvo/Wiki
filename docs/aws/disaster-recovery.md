---
title: Disaster Recovery
---

https://aws.amazon.com/disaster-recovery

https://aws.amazon.com/solutions/databases/disaster-recovery

Disaster Recovery of Workloads on AWS: Recovery in the Cloud - https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-workloads-on-aws.html

Plan for Disaster Recovery (DR) - https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/plan-for-disaster-recovery-dr.html

Summary of the AWS Service Event in the US East Region - https://aws.amazon.com/message/67457/

## RPO and RTO

Disaster Recovery (DR) objectives - https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/disaster-recovery-dr-objectives.html

REL13-BP01 Define recovery objectives for downtime and data loss - https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_planning_for_recovery_objective_defined_recovery.html

RTO: recovery time objective. Maximum downtime. How long it takes to restore the system.

RPO: recovery point objective. Maximum data loss. Time of the latest backup.

## Strategies

Disaster recovery options in the cloud - https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html

- [Disaster Recovery (DR) Architecture on AWS, Part I: Strategies for Recovery in the Cloud](https://aws.amazon.com/blogs/architecture/disaster-recovery-dr-architecture-on-aws-part-i-strategies-for-recovery-in-the-cloud/)
- [Disaster Recovery (DR) Architecture on AWS, Part II: Backup and Restore with Rapid Recovery](https://aws.amazon.com/blogs/architecture/disaster-recovery-dr-architecture-on-aws-part-ii-backup-and-restore-with-rapid-recovery/)
- [Disaster Recovery (DR) Architecture on AWS, Part III: Pilot Light and Warm Standby](https://aws.amazon.com/blogs/architecture/disaster-recovery-dr-architecture-on-aws-part-iii-pilot-light-and-warm-standby/)
- [Disaster Recovery (DR) Architecture on AWS, Part IV: Multi-site Active/Active](https://aws.amazon.com/blogs/architecture/disaster-recovery-dr-architecture-on-aws-part-iv-multi-site-active-active/)

Live data means the data stores and databases are up-to-date (or nearly up-to-date) with the active Region and ready to service read operations.

- Active/passive: only one site gets traffic. When a disaster occurs, the requests are routed to the passive site.
- Active/active: both sites get traffic.

| Backup and restore              | Pilot light                       | Warm standby                          | Multi site active/active                                |
| ------------------------------- | --------------------------------- | ------------------------------------- | ------------------------------------------------------- |
| Data backed up                  | Data live                         | Data live                             | Data live                                               |
| Active/passive                  | Active/passive                    | Active/passive                        | Active/active                                           |
| $ (lowest cost)                 | $$                                | $$$                                   | $$$$ (highest cost)                                     |
| RTO of hours (highest)          | RTO of 10s of minutes (eg 30 min) | RTO of minutes                        | Lowest RTO                                              |
| No infrastructure deployed      | Services are idle or shut off     | Minimum services running              | All infrastructure running at full capacity, duplicated |
| Can't serve traffic immediately | Can't serve traffic immediately   | Can serve minimal traffic immediately | Can serve production traffic                            |

### Backup and restore

Backups are done to another region for safety.

The infrastructure is rebuilt manually, which takes hours.

### Pilot light

Basic infrastructure elements are in place, like Elastic Load Balancing and EC2 Auto Scaling, but services are "shut off" (ie no EC2 instances are running).

It cannot serve requests until triggered.

### Warm standby

Maintains a minimum deployment that can handle requests, but at a reduced capacity—it cannot handle production-level traffic. We have a few EC2 instances running only.

Before failover, the infrastructure must scale up to meet production needs.

### Multi site active/active

Both sites serve traffic.

## Application Recovery Controller

Move traffic across Regions or away from Availability Zones.

https://aws.amazon.com/application-recovery-controller

Announcement - https://aws.amazon.com/blogs/aws/amazon-route-53-application-recovery-controller

https://aws.amazon.com/blogs/aws/amazon-route-53-application-recovery-controller/ - Part 2: https://aws.amazon.com/blogs/networking-and-content-delivery/building-highly-resilient-applications-using-amazon-route-53-application-recovery-controller-part-2-multi-region-stack/

Guidance for Cross Region Failover & Graceful Failback on AWS - https://aws.amazon.com/solutions/guidance/cross-region-failover-and-graceful-failback-on-aws
