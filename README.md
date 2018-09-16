# nodejs_blockchain_demo
This small, demo project was built to primarily demonstrate my ability to create
a NodeJS server, which could read from a data source (the blockchain.info data
  pages in this case), and provide the data to a caller (either curl or browser -
    AngularJS webpage included).

This provides 3 quick RESTful API endpoints (all 3 are GETs in this demo):

- localhost/test - send back a quick "Hello World!" string to verify the server
is running
- localhost/showlateststats - send a JSON block from the blockchain.info/stats pages
- localhost/showunconftxs - send a JSON block from teh blockchain.info/unconfirmed-transactions
pages

The NodeJS server primarily uses express and async-request modules.

- To run the server: <br>
*node nodejs_server.js*

# AngularJS demo webpage
The included angular test page (under the web subdirectory) only makes use of the
showlateststats API endpoint.

On entry, it does not call the server.  Clicking the Update button will call the
NodeJS server API, and parse the results, displaying some values.  If the timestamp
has changed, it will add this row to the historical table in order to show the changes
over time.

The nodejs server can be also accessed via the curl command line tool

# In Conclusion
This is, by no means, a comprehensive application of nodejs and blockchain information.

This was merely to demonstrate a simple NodeJS and AngularJS project, exposing some
RESTful APIs, using asynchronous calls, parsing and displaying the data using AngularJS's $scope'd variables, etc.
