---
sidebar_position: 2
title: Oracle Fusion Middleware 12c
description: Oracle FMW domain configuration for Merchandising
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Setup Oracle Weblogic

## Installation


## Domain Configuration

### Templates
 * Oracle Enterprise Manager [em]
 * Oracle WSM Policy Manager [oracle_common]
 * Oracle JRF [oracle_common] \*
 * Weblogic Coherence Cluster Extension [wlserver] \*

:::note
  \* Automatically selected
:::

### Administrator Server

| <!-- --> | <!-- --> |
|---|---|
| ___server_name:___   | _AdminServer_       |
| ___server_port:___   | _7001_              |
| ___server_group:___  | _JRF-MAN-SVR_       |
| ___credentials:___  | _`weblogic`/`Orawls12c`_  |


### Repository Components

| <!-- --> | <!-- --> |
|---|---|
|___prefix:___   | _MOM16_     |
|___password:___ | _Oretail16_ |


### Node Manager

| <!-- --> | <!-- --> |
|---|---|
| ___credentials:___ | _`nodemanager`/`Orawls12c`_ |
| ___port:___        | _5556_                      |


:::caution
  Remember to disable the SSL listener in `nodemanager.properties` file after installation.
:::


### Topology
#### Managed Servers
| Server Name              | Port | Server Groups |
|--------------------------|------|---------------|
| rms-server               | 7101 | JRF-MAN-SVR   |
| resa-server              | 7102 | JRF-MAN-SVR   |
| reim-server              | 7103 | JRF-MAN-SVR   |
| rpm-server               | 7104 | JRF-MAN-SVR   |
| alloc-server             | 7105 | JRF-MAN-SVR   |
| sim-server               | 7106 | JRF-MAN-SVR   |
| rib-func-artifact-server | 7200 | JRF-MAN-SVR   |
| rib-tafr-server          | 7201 | JRF-MAN-SVR   |
| rib-riha-server          | 7202 | JRF-MAN-SVR   |
| rib-igs-server           | 7203 | JRF-MAN-SVR   |
| rib-rms-server           | 7211 | JRF-MAN-SVR   |
| rib-rpm-server           | 7212 | JRF-MAN-SVR   |
| rib-sim-server           | 7213 | JRF-MAN-SVR   |
| rsb-http-proxy           | 7300 | JRF-MAN-SVR   |
| rsb-server-1             | 7301 | JRF-MAN-SVR   |


#### Server Templates
| Name                      | Listen Port | SSL Port | Enable SSL | 
|---------------------------|-------------|----------|------------|
| wsm-cache-server-template | 7100        | 8100     | _false_      |
| wsmpm-server-template     | 7100        | 8100     | _false_      |


#### Cohherence Clusters
| Cluster Name            | Cluster Listen Port |
|-------------------------|---------------------|
| defaultCoherenceCluster | 7574                |


#### Machines
<Tabs>
  <TabItem value="a" label="Unix" default>

| Name            | Node Manager Listen Address | Node Manager Port |
|-----------------|-----------------------------|--------------|
| retail-machine  | localhost                   | 5556         |

  </TabItem>
</Tabs>

:::caution
_Assign __all__ servers to the machine_
:::


#### Deployment Targeting
From Deployments side, add the _`opss-rest`_ and _`wsm-pm`_ deployments from the _AppDeployment_ to each managed server in the DeploymentTargets side.

#### Services Targeting
From Services side, add the _`mds-owsm`_ from the _`JDBCSystemResource`_ service to each managed server in the DeploymentTargets side.


### Create mds-CustomPortalDS Datasource using console

 1.  Login to Weblogic Admin console with Administrator user credentials.
 2.  Take Lock & Edit (only in Production Mode) and Navigate to _Services_ &rarr; _Data Sources_ and click on _New_ &rarr; _Generic Data Source_.

  | Property            | Value                          |
  |---------------------|--------------------------------|
  | Name:               | mds-CustomPortalDS             |
  | Scope:              | Gobal                          |
  | JNDI Name:          | jdbc/mds/CustomPortalDS        |
  | Database Type:      | Oracle                         |
  | Database Username:  | _APPDOMAIN_MDS_                |
  | Properties:         | user=_APPDOMAIN_MDS_           |
  | Targets:            | rms-server <br/> AdminServer   |

  3. Click on "Activate Changes" (_only in Production Mode_) and verify _mds-CustomPortalDS_ exists in the _Data Sources_.