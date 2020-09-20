# A new way to find sheet music

## Background

A few years ago I had help from someone and made a wordpress site for viewing scores online. It has been working great and has been getting a fair bit of traffic. I was however always irritated that I couldn't myself structure the Database. For example, a simple thing such as from one piece in the opera, have a link to the next, was made very hard. I had to hard code every link by hand. This is not a reasonable way to do things. Now that I have made the site myself from scratch I can steer exactly how the data is structured and what gets grouped together. 

## In progress

Should I add a row for acts in pieces, so I can group the operas by act in the /composer/opera view? Adding it to the DB would be quite quick. 

Should I rewrite client in typescript? Might make things more clear, so I know exactly what does in and out of each function. Might avoid a few bugs, and remove the ugly checking for undefined that I have to use in some places, like the search for example. Could also be interesting to learn it.  

I might need to create more routes, if performance slows down, so that every single API route only queries exactly what it needs. Now the API queries for a few things it might not need. However so far performance is great so no need to worry as of yet. 

Another concern: It might be worth restructuring the site to use Redux. However, the problem then is, how much of the database would you put into the Redux? I am unsure how much data is okay for a web browser to handle. When the site is done I might have a maximum of 700 pieces, meaning that the page would have to read in a query containing an array with 700 items, and each item being an object containing 7 key value pairs + mod time and creation time. Is that to much?

A third thing that I might have to look over. The PDF viewer works great, but when loading really big files, 150 pages and more, it cant really render them well on a phone and I have to scorll a lot up and down to get it to work. Maybe I should use the googlePDFViewer for the big files, even though it is quite buggy, because at least it is better at rendering the things correctly. However then I need to reinsert all the logic for reloading it every 3 seconds if the PDF doesnt show up. Quite an ugly solution. 

One more very important thing to work on is the looks. I need to look into how to do some stylish css. It would be awesome if the site could look really crisp and clean. Right now it is a bit of a mixed bag. 

const googleUrlPDF = `https://drive.google.com/viewerng/viewer?embedded=true&url=https://singcademy.com/wp-content/uploads/pdfsToBeAccessed/${filename}`