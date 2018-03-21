# Part 1: Introduction

The most straightforward and researched method of decreasing inequality in developing economies is government investment in agriculture. Increased investment in agriculture leads to decreased income divide between urban and rural areas and is the first step towards becoming a developed economy. Sub-Saharan Africa has especially high inequality in addition to low agricultural productivity. One way of influencing policy makers in SSA to invest in agriculture is to show visual changes in specific case studies. Missing data is often an issue in achieving this goal: many countries that have invested in agriculture cannot show meaningful results. Satellite image analysis is one way to visually show the relationship between inequality and agricultural development. The goal of this study is to analyze raster images and associated metadata from NASA satellite imagery databases to show the relationship between agriculture and inequality while filling in historical and present-day data gaps in Sub-Saharan Africa.

# Part 2: Sketches

<img width="509" alt="screen shot 2018-03-15 at 12 36 57 pm" src="https://user-images.githubusercontent.com/15457713/37477268-9f0bd322-284d-11e8-9d48-b5fdd3a1dc6d.png">


<img width="529" alt="screen shot 2018-03-15 at 12 37 46 pm" src="https://user-images.githubusercontent.com/15457713/37477334-cc7d2540-284d-11e8-936a-f80ee0226e26.png">


# Part 3: Using supervised learning image analysis

For my thesis I will be analyzing raster images and associated metadata from NASA satellite imagery databases. My goal will be to show how investing in agriculture can improve inequality while filling in historical and present-day data gaps in Sub-Saharan Africa.

I have access to hundreds of thousands of images from 1972 to present day with one major restriction: these images are huge, so I want to work as much as possible with remotely hosted data. Older imagery (more than 10 years old) isn’t hosted remotely in an accessible way, so it is essential that I figure out filtering algorithms in order to reduce the size requirements of my data and hopefully keep hosting costs at $0. After algorithmic filtering I will move on to supervised machine learning processes.

**My metadata text filtering will look something like the following:**

_Select an image from this lat and long
taken between 11am and 3pm
somewhere between 1981 to 1983
That has a cloud cover of less than 5%_

_Note: One big challenge with image filtering will be to define agricultural areas for my image filtering. There is landuse data included in NASA's satellite imagery, but I'm not sure how extensive it is. This may require a different tool._

Supervised learning will be used to compare rastor image analysis to world bank data. The goal will be to create a supervised learning algorithm that predicts changes in inequality measures over time through analyzing visual shifts in agriculture health over time.

**The training model would:**

-  Analyze how a set of training images of non-urban agricultural areas change over time
- Analyze how shifts in training images correspond to shifts in training data from the world bank.

**The goal would be to:**

- Predict inequality data based on shifts in test satellite image data.


**With the purpose of:**

- Showing visually how how investing in agriculture can improve inequality while filling in historical and present-day data gaps in Sub-Saharan Africa.

This is supervised learning in the sense that I will be providing my model with general features for prediction, but because I don’t want to to define every potential rgb value predictor feature, I will need to use supervised feature extraction. I am thinking about using scikit-image and regression to create my model. This idea will gradually become simpler with the incorporation of image averaging and already created analysis tools. In terms of prediction accuracy, I would be happy with anything over 80%.



# Part 4: Data Sources
Parsons MS Data Visualization Thesis

[Here's some initial sketches and outline of what I'm doing](https://docs.google.com/document/d/1Mt97apMBiftzz9G0UOKTKWIJBqxirUuI4DFdZRfWPxk/edit?usp=sharing)

## 1. Landsat

_Landsat represents the world's longest continuously acquired collection of space-based moderate-resolution land remote sensing data._

_History of Landsat missions from NASA:_
![timelineonlyforwebrgb](https://user-images.githubusercontent.com/15457713/36821749-8480a852-1cc2-11e8-995c-3f671785da1c.jpg)
`https://landsat.usgs.gov/landsat-missions-timeline`

- [Landsat 1-7 available to download from NASA](https://earthexplorer.usgs.gov)
  - I will use this for historical analysis.

- [Metadata Example for Landsat 4 from 1989 converted from XML to JSON](https://raw.githubusercontent.com/ryezzz/data_viz_thesis/master/landsat4metadata.json)

- [Landsat 8 on AWS](https://aws.amazon.com/public-datasets/landsat/)
  - I will use this for present day comparisons (rural/urban poverty gap)

- [Summary JSON](http://landsat-pds.s3.amazonaws.com/c1/L8/088/064/LC08_L1TP_088064_20180112_20180119_01_T1/LC08_L1TP_088064_20180112_20180119_01_T1_MTL.json)
- [Visual Data Explore](https://landsatonaws.com)
- Tile Preview:

![lc08_l1tp_088064_20180112_20180119_01_t1_thumb_large](https://user-images.githubusercontent.com/15457713/36820986-d06973e2-1cbe-11e8-9d8b-f447eecf442b.jpg)

- Questions for prepping data
    - Which bands should I analyze for agriculture?
    - What already created tools are best for analyzing agriculture?
    - Which python algorithm is best for filtering based on cloud cover?
    - What tools can make this easier? How can I use what's already been done to make something   more complete?
    - What's the best tool for simultaneously working with AWS and NASA hosted data

## 2. Suomi NPP VIIRS / Earth at night satellite data
   - NASA released entirely new Visible Infrared Imaging data in 2017. I haven't figured out how to access it yet.
![npp_d20170821_t1830_e18355_02-1](https://user-images.githubusercontent.com/15457713/36854817-ea07f75c-1d3f-11e8-8ac0-462574f9a44a.png)

## 3. World Development Indicators / World Bank
