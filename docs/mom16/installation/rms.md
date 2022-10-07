---
sidebar_position: 3
title: Merchandising System
description: Merchandising database installation tasks
---

# Retail Merchandising System

## Database Installation Tasks

### RMS Tablespaces (Required)
  * `REAIL_DATA`
  * `REAIL_INDEX`
  * `ENCRYPTED_RETAIL_DATA`
  * `ENCRYPTED_RETAIL_INDEX`

<br/>

Change all the `<datafile_path>` strings and the data file storage params and sizes based on partitioning strategy in the below files:
  * `STAGING_DIR/rms/installer/create_db/create_rms_tablespaces.sql`
  * `STAGING_DIR/rms/installer/create_db/create_encrypted_tablespaces_no_TDE.sql`

```bash title="Use this block code for help"
file=${STAGING_DIR}/rms/installer/create_db/create_rms_tablespaces.sql
file=${STAGING_DIR/}rms/installer/create_db/create_encrypted_tablespaces_no_TDE.sql

sed -i "s/RETAIL_index04/retail_index04/g" $file
sed -i "s+<datafile_path>+${ORACLE_BASE}/oradata/RETAIL+g" $file
sed -i "s/MAXSIZE 2000M/MAXSIZE 5000M/g" $file
sed -i "s/SIZE 500M/SIZE 1000M/g" $file
sed -i "s/SIZE 50M/SIZE 200M/g" $file
sed -i "s/SIZE 100M/SIZE 500M/g" $file

sqlplus / as sysdba @$file
```



### RMS Roles and Users Creation

```bash title="Use this block code for help"
script_dir="$STAGING_DIR/rms/installer/create_db"
sql="sqlplus / as sysdba"

${sql} @${script_dir}/create_roles.sql
${sql} @${script_dir}/create_user.sql
${sql} @${script_dir}/create_bdi_int_user.sql   
${sql} @${script_dir}/create_bdi_infr_user.sql
```

To create a user for another Merchandising module, like Retail Allocation, run the following script:

```bash
${sql} @${script_dir}/create_user_generic.sql
```

#### Overview

| Schema Owner   | Schema Pasword | Temporal Tablespace |
|----------------|----------------|---------------------|
| RMS16          | `Oretail16`    | TEMP                |
| ALLOC16        | `Oretail16`    | TEMP                |
| RMS16DEMO      | `Oretail16`    | TEMP                |
| BDI_RMS16_INT  | `Oretail16`    | TEMP                |
| BDI_RMS16_INFR | `Oretail16`    | TEMP                |

<br/>



## RMS Installer


### Pre-Installation Tasks
It is recommended, but not required, that the Database and Batch installation be done at the same time and use the same path for _RETAIL_HOME_.

:::note
  Verify the `ORACLE_HOME` and `ORACLE_SID` variables after running the installation.
:::


By default the RMS installer does not have the right permissions on some required scripts, so you can use below block to fix it.

```bash 
# Examples
JAVA_HOME=/usr/java/jdk1.8.64bit; export JAVA_HOME
NLS_LANG=AMERICAN_AMERICA.AL32UTF8; export NLS_LANG
ANT_HOME=${STAGING_DIR}/rms/installer/mom/Build/orpatch/deploy/ant; export ANT_HOME

PATH=${PATH}:${ANT_HOME}/bin; export PATH

find ${STAGING_DIR}/rms/installer -name preinstall.sh -exec chmod +x '{}' \;
chmod +x ${ANT_HOME}/bin/ant
chmod +x ${STAGING_DIR}/rms/installer/install.sh
```

The RMS batch installation needs the `demo_rdbms.mk` file within the ORACLE_HOME. This file is located in `STAGING_DIR/rms/installer`, so you can run the following command to copy automatically.
```bash
find ${STAGING_DIR}/rms/installer -name demo_rdbms.mk -exec cp '{}' ${ORACLE_HOME}/rdbms/demo \;
```


For the Batch Installation, you must check the following notes:
> Refer to the following Oracle Support note if the operating system platform is Linux: <br/>
> __DocID 102288.1 – *Precompiling Sample Pro\*C Programs on Linux Fails with PCC-02015 and PCC-02201*__

<br/>
<br/>

Look for the `pcscfg.cfg` located in `${ORACLE_HOME}/precomp/admin/pcscfg.cfg` and compare the paths to that the Linux OS has. You can check this by running the next command:  
```bash 
bash$ cpp -v /dev/null -o /dev/null
-------------------------------
# Output from the above command will look something like:

Using built-in specs.
COLLECT_GCC=cpp
OFFLOAD_TARGET_NAMES=nvptx-none
OFFLOAD_TARGET_DEFAULT=1
Target: x86_64-redhat-linux
Configured with: ../configure --enable-bootstrap --enable-languages=c,c++,fortran,lto --prefix=/usr --mandir=/usr/share/man --infodir=/usr/share/info --with-bugurl=http://bugzilla.redhat.com/bugzilla --enable-shared --enable-threads=posix --enable-checking=release --enable-multilib --with-system-zlib --enable-__cxa_atexit --disable-libunwind-exceptions --enable-gnu-unique-object --enable-linker-build-id --with-gcc-major-version-only --with-linker-hash-style=gnu --enable-plugin --enable-initfini-array --with-isl --disable-libmpx --enable-offload-targets=nvptx-none --without-cuda-driver --enable-gnu-indirect-function --enable-cet --with-tune=generic --with-arch_32=x86-64 --build=x86_64-redhat-linux
Thread model: posix
gcc version 8.4.1 20200928 (Red Hat 8.4.1-1.0.4) (GCC)
COLLECT_GCC_OPTIONS='-E' '-v' '-o' '/dev/null' '-mtune=generic' '-march=x86-64'
 /usr/libexec/gcc/x86_64-redhat-linux/8/cc1 -E -quiet -v /dev/null -o /dev/null -mtune=generic -march=x86-64
ignoring nonexistent directory "/usr/lib/gcc/x86_64-redhat-linux/8/include-fixed"
ignoring nonexistent directory "/usr/lib/gcc/x86_64-redhat-linux/8/../../../../x86_64-redhat-linux/include"
#include "..." search starts here:
#include <...> search starts here:
 /usr/lib/gcc/x86_64-redhat-linux/8/include
 /usr/local/include
 /usr/include
End of search list.
COMPILER_PATH=/usr/libexec/gcc/x86_64-redhat-linux/8/:/usr/libexec/gcc/x86_64-redhat-linux/8/:/usr/libexec/gcc/x86_64-redhat-linux/:/usr/lib/gcc/x86_64-redhat-linux/8/:/usr/lib/gcc/x86_64-redhat-linux/
LIBRARY_PATH=/usr/lib/gcc/x86_64-redhat-linux/8/:/usr/lib/gcc/x86_64-redhat-linux/8/../../../../lib64/:/lib/../lib64/:/usr/lib/../lib64/:/usr/lib/gcc/x86_64-redhat-linux/8/../../../:/lib/:/usr/lib/
COLLECT_GCC_OPTIONS='-E' '-v' '-o' '/dev/null' '-mtune=generic' '-march=x86-64'
-------------------------------
```


### Running the Installer

Run the `${STAGING_DIR}/rms/installer/install.sh` script to start the installation in GUI mode.

It should return something like this:

```log
*********************************************
  Checking environment for RMS installation
*********************************************

Verified NLS_LANG: AMERICAN_AMERICA.UTF8

JAVA_HOME=/opt/java/jdk1.8.0_311
Verified Java version 1.7.0.x or greater. Java version: 1.8.0

ANT_HOME=/u01/stage/mom16/rms16//rms/installer/mom/Build/orpatch/deploy/ant
Verified Ant version 1.9.6.x or greater. Ant version: 1.10.5

**************************************************
  Checking environment for Database installation
**************************************************

Verified Java version 1.7.0.x or greater. Java version: 1.8.0
JAVA_HOME=/opt/java/jdk1.8.0_311
Verified $ORACLE_HOME.
Verified ORACLE_SID: RETAIL
Verified write permissions
Verified SQL*Plus exists
Verified sqlldr exists
Running tnsping to get listener port

This Oracle Retail product will be installed using the following environment settings:
ORACLE_HOME=/u01/app/product/12c/dbhome_1
ORACLE_SID=RETAIL

Database environment check successful

***********************************************
  Checking environment for Batch installation
***********************************************

Verified $ORACLE_HOME.
Verified ORACLE_SID: RETAIL
Verified demo_rdbms.mk exists.
Verified write permissions.
Verified Java version 1.7.0.x or greater. Java version: 1.8.0
JAVA_HOME=/opt/java/jdk1.8.0_311
Verified make: /usr/bin/make.
Verified makedepend: /usr/bin/makedepend.
Verified cc: /usr/bin/cc.
Verified ar: /usr/bin/ar.
Verified ANSI compliance.

Batch environment check successful

*****************************************************
  Checking environment for WLS J2EE installation
*****************************************************


WLS J2EE environment check successful

***************************
  Final preinstall status
***************************

Database Preinstall Check:    SUCCESS

Batch Preinstall Check:       SUCCESS

WLS J2EE Preinstall Check:    SUCCESS
```


### Installation Steps

#### Component Selection

  * Install Database Objects 
  * Install Batch            
  * Install Application      

#### Database Component Selection

  * RMS/RPM
  * ReIM
  * Allocation
  * ~~RMS DAS Schema~~

#### Full or Patch

  * Full
  * ~~Patch~~


#### Installation Properties

| <!-- -->                               | <!-- -->                                      |
|----------------------------------------|-----------------------------------------------|
| __hostname:__                          | localhost                                   |
| __Secure JDBC Connection:__            | false                                         |
| __RMS JDBC URL:__                      | jdbc:oracle:thin:@//localhost:1521/RETAIL   |
| __RMS Schema Security Alias:__         | dsRMS16Alias                                  |
| __RMS INT Schema Security Alias:__     | dsRMS16BDIIntAlias                            |
| __RMS INFT Schema Security Alias:__    | dsRMS16BDIInfrAlias                           |
| __Alloc Schema Security Alias:__       | dsAlloc16Alias                                |
| __Primary Country:__                   | MEXICO (MX)                                   |
| __Primary Currency:__                  | Mexico Peso (MXN)                             |
| __Primary Language:__                  | English (en)                                  |
| __Default Tax Type:__                  | SVAT                                          |
| __Class-Level VAT:__                   | Enable                                        |
| __Calendar Type:__                     | 454 Calendar                                  |
| __Week Start-End:__                    | Mon-Sun                                       |
| __HTS Tracking Level:__                | Country of Manufacturer                       |
| __Data Level Security:__               | Disabled                                      |
| __RMS Demo Data:__                     | True                                          |
| __ReIM Demo Data:__                    | True                                          |
| __Demo Data Schema Security Alias:__   | dsDemoData16Alias                             |
| __Number of demo items:__              | 20                                            |
| __Transaction Level:__                 | 2 (Line Extension)                            |



<br/>
<br/>


### Post-Installation Tasks

 1. Copy `runtime12.jar` from Database install library directory `ORACLE_HOME\sqlj\lib` to `WEBLOGIC_DOMAIN_HOME/lib` directory.
 2. Configure JDBC connection pool maximum capacity value at least 200 in Weblogic Console for RmsDBDS and RetailPatformDBDS Data Sources.
 3. RMS Application Server where the application is deployed should have at least 6GB of maximum JVM Heap size.
    1. Login to MOM Weblogic Console
    2. Click on _Environment_ &rarr; _Servers_ &rarr; _rms_server_ &rarr; _Configuration_ &rarr; _Server Start_
    3. Add below lines in the Arguments box:
       ``` 
       -Xms6144m –Xmx6144m 
       ```
    4. Restart RMS WebLogic Domain servers including AdminServer.



## Test RMS Application

After the application installer completes you should have a working RMS application installation. To launch the application, open a web browser and go to `http://<HOST_NAME>: <httpport>/Rms/faces/RmsHome`

> The default, preloaded user supplied in the LDIF scripts for testing this installed
application is RMS_ADMIN; the password is the password which you have given
in the LDIF file RGBU-oid-create-users.ldif as part of loading LDIF files into the
LDAP.