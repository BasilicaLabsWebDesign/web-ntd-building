(function(){
  var f=document.getElementById('enquiry');
  if(!f) return;
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var d=new FormData(f);
    var body='Name: '+d.get('name')+'\nPhone: '+d.get('phone')+'\nEmail: '+(d.get('email')||'-')+'\n\n'+d.get('message');
    location.href='mailto:ntdbuilding@gmail.com?subject='+encodeURIComponent('Free consultation request — '+d.get('name'))+'&body='+encodeURIComponent(body);
  });
})();
