---
sidebar_position: 1
title: Oracle Database 19c
description: Oracle Database configuration for Merchandising
---

# Setup Oracle Database 19c

## Installation

See _Database Installation Guide for Linux_ [(HTML)](https://docs.oracle.com/en/database/oracle/oracle-database/19/ladbi/index.html) [(PDF)](./../../../static/oradocs/database19c-installation-guide-linux.pdf)


## Configuration

### System Parameters

```sql
alter system set processes=1500 scope=spfile;

alter system set open_cursors=900 scope=spfile;
```


### Schema Profile

```sql
alter profile default limit password_life_time unlimited;

alter profile default limit failed_login_attempts unlimited;
```