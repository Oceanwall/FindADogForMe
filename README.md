# Find a Dog for Me

![Home Page](https://i.imgur.com/davTAEK.png)

Dynamic website that maps connections between Dogs, Shelters, Breeds, and Activities in order to encourage the adoption of dogs by prospective owners.

Frontend built on React and Bootstrap, featuring searching, sorting, and filtering capabilities. Also includes data-driven D3.js visualizations of both our own website's data and that of another group's.

Backend API built on Flask and PostgreSQL. Includes automated seeding scripts to fetch and filter data from multiple APIs, and reseed database with updated information. Provides multiple routes that can be used to query for information relating to dogs, shelters, breeds, activities, and the various relationships between these models.

The website is hosted using AWS. Route 53 is used for the domain name, S3 and CLoudFront to publish the frontend React static build files, Elastic Beanstalk to host the API, and RDS to host our PostgreSQL database.

This project includes a robust test suite that makes use of GitLab's free CI pipelines, which can be found <a href="https://gitlab.com/oceanwall/findadogforme/pipelines" target="_blank">here</a>. This test suite includes front-end testing using Selenium, Mocha, and Chai, and back-end testing using Postman and unittest, and is facilitated by the automated installation of docker images onto the CI machines.

Original GitLab Repository can be found here: https://gitlab.com/oceanwall/findadogforme/.

Link to website: https://findadogfor.me/

Link to API website: https://api.findadogfor.me/

Postman Documentation: https://documenter.getpostman.com/view/6754951/S11KQJxc

It's possible that the website may not be up by the time you visit this repository. If so, you can find video demos of the website below.

[![Desktop Walkthrough](https://i.imgur.com/KtAfN6f.png)](https://www.youtube.com/watch?v=HDI8-G0o6ZQ) <br>
[![Mobile Walkthrough](https://i.imgur.com/NziitL4.png)](https://www.youtube.com/watch?v=gE7AvDWvxIM) <br>
[![Visualizations](https://i.imgur.com/S5xZEVJ.png)](https://www.youtube.com/watch?v=_YvAMYPKhgA) <br>
