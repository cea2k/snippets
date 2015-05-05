// Automatic toggle entries

var WID = 572181;

var newEntry = function(wid, project, description, start, stop, duration) {
  $.ajax({
    url: "https://www.toggl.com/api/v8/time_entries",
    data: JSON.stringify({
        time_entry: {
          description:  description,
          duration:     duration,  
          pid:          project,
          start:        start,
          stop:         stop,
          wid:          wid,

          billable:     false,
          created_with: "TogglNext",
          duronly:      false,
          //guid:         "7b3185d6-8383-473c-b83a-8255c3ac3158",
          tags:         [],
          tid:          null
        }
      }),
    type: "POST",
    contentType: 'application/json',
    dataType: 'json',
  }).done(function(response, textStatus, jqXHR){
    console.log("Entry OK start:" + start + "  stop:" + stop )
  })
};

var newAutoDayEntry = function(wid, project, description, date) {
  var txtStart    = date + 'T09:00:00-02:00'; //formato "2015-04-02T09:00:00-02:00",
  var txtStop     = date + 'T13:00:00-02:00'; //formato "2015-04-02T09:00:00-02:00",
  var momStart    = moment(txtStart).add(300 - Math.round(Math.random()*600), "seconds")
  var momStop     = moment(txtStop).subtract(Math.random()*60), "seconds")
  var duration    = momStop.diff(momStart) / 1000;

  newEntry(wid, project, description, momStart.format(), momStop.format(), duration)

  txtStart    = date + 'T14:00:00-02:00'; 
  txtStop     = date + 'T18:10:00-02:00'; 
  momStart    = moment(txtStart).add(Math.round(Math.random()*120), "seconds")
  momStop     = moment(txtStop).subtract(600 - Math.random()*1200), "seconds")
  duration    = momStop.diff(momStart) / 1000;

  newEntry(wid, project, description, momStart.format(), momStop.format(), duration)

}

var entries = [

  {dt:"2015-04-25", ti:"09:01", tf:"12:56", prj:9038936, dsc:"Reinversiones" },
  {dt:"2015-04-25", ti:"14:01", tf:"18:20", prj:9038936, dsc:"Reinversiones" },
  {dt:"2015-04-26", ti:"09:05", tf:"12:57", prj:9038936, dsc:"Reinversiones" },
  {dt:"2015-04-26", ti:"14:02", tf:"18:21", prj:9038936, dsc:"Reinversiones" },
  {dt:"2015-04-27", ti:"09:02", tf:"12:58", prj:9038936, dsc:"Reinversiones" },
  {dt:"2015-04-27", ti:"14:04", tf:"18:22", prj:9038936, dsc:"Reinversiones" },
  {dt:"2015-04-28", ti:"09:08", tf:"12:59", prj:9038936, dsc:"Reinversiones" },
  {dt:"2015-04-28", ti:"14:07", tf:"18:28", prj:9038936, dsc:"Reinversiones" },

];

_.each(entries, function(e) {
  var start    = e['dt'] + 'T' + e['ti'] + ':00-02:00'; //formato "2015-04-02T09:00:00-02:00",
  var stop     = e['dt'] + 'T' + e['tf'] + ':00-02:00'; //formato "2015-04-02T09:00:00-02:00",
  var duration = moment(stop).diff(moment(start)) / 1000;
  newEntry(WID, e['prj'], e['dsc'], start, stop, duration);
});


