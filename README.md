# TwittMap

TwittMap is a web application where you can search Twitts and represent the Twitts on GoogleMaps. 

## Demo

http://twittmap-env-1.mbqqaa7dup.us-west-2.elasticbeanstalk.com/

## Features

* Use Twitter Streaming API (https://developer.twitter.com/en/docs). to fetch tweets from the twitter hose in real-time. Collect at least one week's worth of tweets. 
* Use AWS (Links to an external site.) ElasticSearch  (https://aws.amazon.com/elasticsearch-service/).to store the tweets on the back-end.
* Create a web UI that allows users to search for a few keywords (via a dropdown). The keywords (up to 10) can be of your choosing.
* Use Google Maps API  (https://developers.google.com/maps/documentation/javascript/) (or any other mapping library) to render these filtered tweets in the map in whatever manner you want.
* Deploy your application on AWS Elastic Beanstalk (https://aws.amazon.com/elasticbeanstalk/). in an auto-scaling environment.
* Use ElasticSearch’s (https://www.elastic.co/guide/en/elasticsearch/guide/current/geoloc.html). geospatial feature that shows tweets that are within a certain distance from the point the user clicks on the map. 

## Reference

https://aws.amazon.com/blogs/big-data/building-a-near-real-time-discovery-platform-with-aws/