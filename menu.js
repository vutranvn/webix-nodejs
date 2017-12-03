module.exports = function(req){

  var menu = [
    { value:"Data Table", data:[
      { href:'/grid', value:"Loading and Saving", icon:"fa-cube" },
      { href:'/grid-dynamic', value:"Dynamic Loading", icon:"fa-table" },
      { href:'/grid-paging', value:"Paging", icon:"fa-bar-chart-o" },
    ]},
    { value:"Tree", data:[
      { href:'/tree', value:"Data Loading", icon:"fa-check-square-o" },
    ]},
    { value:"Form", data:[
      { href:'/form', value:"Loading and Saving", icon:"fa-list-alt" },
      { href:'/form-uploading', value:"File Uploading", icon:"fa-folder-open-o" }
    ]}
  ];

  for (var i=0; i<menu.length; i++)
    for (var j = 0; j < menu[i].data.length; j++) {
      var item = menu[i].data[j];
      if (item.href == req.url)
        item.css = "selected";
    }

  return { menu };
};