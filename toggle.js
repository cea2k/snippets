// Automatic toggle entries

const WID = 572181; //Principal Rescates
const AUTH = 'Basic ZDExZjFjZjA0OTE1ZTgyMjljN2EyZDVlNzcwNDc0YjI6YXBpX3Rva2Vu';
const dirty_at = moment().format();
const offset = '-04:00';

var guid = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;
    return v.toString(16);
  });
}

var newEntry = function(project, description, start, stop, duration, tags) {
  $.ajax({
    url: "https://toggl.com/api/v8/time_entries",
    data: JSON.stringify({
        time_entry: {
          description:  description,
          duration:     duration,
          pid:          project,
          start:        start,
          stop:         stop,
          wid:          WID,
          tags:         tags,

          dirty_at:     dirty_at,
          billable:     true,
          created_with: "TogglNext",
          duronly:      false,
          guid:         guid(),
          tid:          null,
          store_start_and_stop_time: true,
        }
      }),
    'type': "POST",
    'contentType': 'application/json',
    'dataType': 'json',
    'Authorization': AUTH,
    'App-Version': '3.84.25'
  }).done(function(response, textStatus, jqXHR){
    console.log("Entry OK start:" + start + "  stop:" + stop )
  })
};

//time around function
var lastTime = null;
var ta = function(time, around) {
  const mTime = moment(time, 'HH:mm');
  if (mTime.isValid()) {
    lastTime = mTime.add((2*around*Math.random()) - around, 'minute').format('HH:mm');
  }
  return lastTime;
}

var prjOtorgaClv = 4657211;
var prjInterno   = 4653869;
var prjOrglab    = 10986600;

var entries = [
  {dt:"2016-11-28", ti:ta("08:30", 10), tf:ta("12:30",  0), prj:prjOrglab,  dsc:"904", tags: [] },
  {dt:"2016-11-28", ti:ta("*",      0), tf:ta("13:30", 15), prj:prjOrglab,  dsc:"Standup", tags: [] },
  {dt:"2016-11-28", ti:ta("14:10", 15), tf:ta("18:00", 20), prj:prjOrglab,  dsc:"904", tags: [] },
  {dt:"2016-11-29", ti:ta("08:30", 10), tf:ta("12:30",  0), prj:prjOrglab,  dsc:"932", tags: [] },
  {dt:"2016-11-29", ti:ta("*",      0), tf:ta("13:30", 15), prj:prjOrglab,  dsc:"Standup", tags: [] },
  {dt:"2016-11-29", ti:ta("14:10", 15), tf:ta("18:00", 20), prj:prjOrglab,  dsc:"932", tags: [] },
  {dt:"2016-11-30", ti:ta("08:30", 10), tf:ta("12:30",  0), prj:prjOrglab,  dsc:"932", tags: [] },
  {dt:"2016-11-30", ti:ta("*",      0), tf:ta("13:30", 15), prj:prjOrglab,  dsc:"Standup", tags: [] },
  {dt:"2016-11-30", ti:ta("14:10", 15), tf:ta("18:00", 20), prj:prjOrglab,  dsc:"932", tags: [] },
  {dt:"2016-12-01", ti:ta("08:30", 10), tf:ta("12:30",  0), prj:prjOrglab,  dsc:"1109", tags: [] },
  {dt:"2016-12-01", ti:ta("*",      0), tf:ta("13:30", 15), prj:prjOrglab,  dsc:"Standup", tags: [] },
  {dt:"2016-12-01", ti:ta("14:10", 15), tf:ta("18:00", 20), prj:prjOrglab,  dsc:"1109", tags: [] },
  {dt:"2016-12-02", ti:ta("08:30", 10), tf:ta("12:30",  0), prj:prjInterno, dsc:"1109", tags: [] },
  {dt:"2016-12-02", ti:ta("*",      0), tf:ta("13:30", 15), prj:prjOrglab,  dsc:"Standup", tags: [] },
  {dt:"2016-12-02", ti:ta("14:10", 15), tf:ta("16:20", 15), prj:prjOrglab,  dsc:"1109", tags: [] },
];

_.each(entries, function(e) {
  var start    = e['dt'] + 'T' + e['ti'] + ':00' + offset;
  var stop     = e['dt'] + 'T' + e['tf'] + ':00' + offset;
  var duration = moment(stop).diff(moment(start)) / 1000;
  var tags = !!e['tags'] ? e['tags'] : []
  newEntry(e['prj'], e['dsc'], start, stop, duration, tags);
});
