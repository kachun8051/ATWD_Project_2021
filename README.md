# Assignment of Recreational facility (ATWD of year 2021)
  It is a php mysql web project. The web site composite of:
  - PHP - acting backend RESTful API
  - MySQL - acting backend persistent database
  - Html + JavaScript - acting client side interact with php.
  - Datasource - JSON string coming from [https://www.lcsd.gov.hk/datagovhk/facility/facility-bbqs.json](https://www.lcsd.gov.hk/datagovhk/facility/facility-bbqs.json)   

## Folder structure

```
+-- src
|   +-- css
|   |   +-- dropdown.css
|   |   +-- myStyle.css
|   +-- images
|   |   +-- bin.png
|   |   +-- edit.png
|   |   +-- gmap.png
|   |   +-- info.png
|   +-- js
|   |   +-- myAjax.js
|   |   +-- myTableCRUD.js
|   |   +-- ValidatingAdd.js
|   |   +-- ValidatingEdit.js
|   +-- BarbecueService.php
|   +-- DbinitService.php
|   +-- clsDbInit.php
|   +-- controller.php
|   +-- getSqlString.php
|   +-- index.html
|   +-- README.md

```

## Endpoints

The url structure is:
> ```http://localhost/controller.php/<resource>/<key1>/<value1>/... ```

| Function | HTTP Method | Endpoint | Url example |
| ------ | ------ | ------ | ------ |
| 1. Initial the database | GET | /dbinit | http://localhost/ATWD_Project_2021/controller.php/dbinit |
| 2. Delete a facility | DELETE | /barbecue/GIHS/:gihs | http://localhost/ATWD_Project_2021/controller.php/barbecue/GIHS/0e879In4fk |
| 3. Add a facility | POST | /barbecue | http://localhost/ATWD_Project_2021/controller.php/barbecue | 
| 4. Edit a facility | PUT | /barbecue | http://localhost/ATWD_Project_2021/controller.php/barbecue |
| 5. Show all facilities | GET | /barbecue | http://localhost/ATWD_Project_2021/controller.php/barbecue |
| 6. Show all districts | GET | /barbecue/District_en | http://localhost/ATWD_Project_2021/controller.php/barbecue/District_en |

## Uploaded on php hosting server

![/imagesforreadme/ATWD_Project_2021_Cover.png](/imagesforreadme/ATWD_Project_2021_Cover.png)

[http://www.phpmysqlmariadb.byethost3.com/index.html](http://www.phpmysqlmariadb.byethost3.com/index.html)
