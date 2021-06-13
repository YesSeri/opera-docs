# Operadocs

Opera sheet music for free, using only sheet music without copyright. [operadocs](https://www.operadocs.com)

## Background

A few years ago I made a wordpress site for viewing scores online. It has been working great and has been getting a fair bit of traffic. I was however always irritated that I couldn't myself structure the Database, and how it is represented in the webiste. For example, a simple thing such as linking from one piece in the opera to the next, was made very hard. I had to hard code every link by hand. This is not a reasonable way to do things. Now that I have made the site myself from scratch I can steer exactly how the data is structured and what gets grouped together.

## Installation 

First `git clone` the project

After that install all `node_modules` by running `npm run installAll`.

To start dev server run `npm run dev`

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

These are to be put in the client folder .env:

Used by mail service, emailjs:
`REACT_APP_SERVICE_ID`
`REACT_APP_TEMPLATE_ID`
`REACT_APP_USER_ID`

Google Analytics:
`REACT_APP_GOOGLE_TRACKING_ID`

This one is used in the project folder, and used by the server:
`DB_CONNECTION_URL=mysql://root:@localhost:3306/opera_docs`
`DB_CONNECTION_URL=mysql://username:password@hostlocation:port/database_name`

## In progress

Should I add a row for acts in pieces, so I can group the operas by act in the /composer/opera view? Adding it to the DB would be quite quick.

I might need to create more routes, if performance slows down, so that every single API route only queries exactly what it needs. Now the API queries for a few things it might not need. However so far performance is great so no need to worry as of yet.

Another concern: It might be worth restructuring the site to use Redux. However, the problem then is, how much of the database would you put into the Redux? I am unsure how much data is okay for a web browser to handle. When the site is done I might have a maximum of 700 pieces, meaning that the page would have to read in a query containing an array with 700 items, and each item being an object containing 7 key value pairs + mod time and creation time. Is that to much?

One more very important thing to work on is the looks. I need to look into how to do some stylish css. It would be awesome if the site could look really crisp and clean. Right now it is a bit of a mixed bag. 
  This has now partly been implemented, and the mobile experience has been improved. Maybe it can be improved further as I learn more.

## Thoughts and Ideas

- Refactor css -> styled components
  - Is partly done
- Refactor search into smaller pieces
  - Has been overhauled, but can maybe be improved.
  - Use compound components?
- I need a solid pdf viewer longterm.
  - https://github.com/react-pdf-viewer/react-pdf-viewer
    - This one works well, but when i tried it last time it bugged out when there was over a 100 pages in pdf.


## Contributing

Contributions are always welcome!

Just contact me, or submit a pull request if you think you can help. I would be very happy for any help, and all bug reports.

  

## Authors

- [Henrik Zenkert](https://www.github.com/yesseri)

  