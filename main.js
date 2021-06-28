const getTable = require('./getTable.js');
const options=[{
    host:'www.colordic.org',
    path:'',
    encoding:'UTF8'
},{
    host:'www.colordic.org',
    path:'/w',
    encoding:'UTF8'
},
]
for (const option of options) {
    getTable(option)
    
}
// getTable('futureys.tokyo',
// '/how-permission-should-be-set-for-developing-inside-a-container-using-wsl-2/','UTF8');