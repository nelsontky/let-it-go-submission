(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{130:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),s=a(10),o=a.n(s),l=a(15),r=a(12),c=a(17),u=a(16),m=a(18),d=a(77),h=a.n(d),p=a(69);a(106),a(72),a(131);p.initializeApp({apiKey:"AIzaSyCmdA27Yq_H79ugY2uCSzNNZV_JuzBxh0Q",authDomain:"let-it-go-e6229.firebaseapp.com",databaseURL:"https://let-it-go-e6229.firebaseio.com",projectId:"let-it-go-e6229",storageBucket:"let-it-go-e6229.appspot.com",messagingSenderId:"917575844853",appId:"1:917575844853:web:88ec0cbe059a0d43"});var b=p,g=a(56),f=a(19),v=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(r.a)(t,[{key:"watchLocation",value:function(){var e=this;navigator.geolocation?this.id=navigator.geolocation.watchPosition(function(t){var a=t.coords.latitude,n=t.coords.longitude;e.props.updateMyLocation(a,n),e.myLocation.setPosition({lat:a,lng:n}),e.accuracyRadius.setCenter({lat:a,lng:n}),e.accuracyRadius.setRadius(t.coords.accuracy)},function(){return console.log("No permission")},{enableHighAccuracy:!0}):console.log("No permission")}},{key:"componentDidMount",value:function(){var e=this,t={lat:1.296675,lng:103.776396};this.map=new window.google.maps.Map(document.getElementById("map"),{zoom:13,center:t}),this.myLocation=new window.google.maps.Marker({position:t,map:this.map,icon:"https://raw.githubusercontent.com/nelsontky/let-it-go/master/assets/icons/locationMarker.png"}),this.accuracyRadius=new window.google.maps.Circle({map:this.map,center:t,radius:0,fillColor:"#00F",fillOpacity:.2,strokeWeight:0}),this.map.addListener("click",function(t){e.props.handleMapClick(t.latLng.lat(),t.latLng.lng()),null!=e.marker&&e.marker.setMap(null),e.marker=new window.google.maps.Marker({position:t.latLng,map:e.map})}),this.accuracyRadius.addListener("click",function(t){e.props.handleMapClick(t.latLng.lat(),t.latLng.lng()),null!=e.marker&&e.marker.setMap(null),e.marker=new window.google.maps.Marker({position:t.latLng,map:e.map})}),this.myLocation.addListener("click",function(){e.props.handleMapClick(e.myLocation.getPosition().lat(),e.myLocation.getPosition().lng()),null!=e.marker&&e.marker.setMap(null),e.marker=new window.google.maps.Marker({position:e.myLocation.getPosition(),map:e.map})});var a=this;var n=document.createElement("div");new function(e,t){var n=document.createElement("div");n.style.backgroundColor="#fff",n.style.border="2px solid #fff",n.style.borderRadius="3px",n.style.boxShadow="0 2px 6px rgba(0,0,0,.3)",n.style.cursor="pointer",n.style.textAlign="center",n.style.marginBottom="22px",n.style.height="31px",n.title="Click to recenter the map to location",e.appendChild(n);var i=document.createElement("div");i.innerHTML="<img src='https://i.imgur.com/raFRca2.png' />",n.appendChild(i),n.addEventListener("click",function(){t.setCenter(a.myLocation.getPosition())})}(n,this.map),n.index=1,this.map.controls[window.google.maps.ControlPosition.LEFT_BOTTOM].push(n),this.watchLocation()}},{key:"componentWillUnmount",value:function(){navigator.geolocation.clearWatch(this.id)}},{key:"render",value:function(){return i.a.createElement("div",{id:"map",style:{width:"100%",height:"300px"}})}}]),t}(i.a.Component),E=function(e){var t=e.children;return i.a.createElement("div",{style:{margin:"3rem auto",maxWidth:650,padding:"0 1rem"}},t)},y=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.viewer=window.pannellum.viewer("panorama",{type:"equirectangular",panorama:this.props.url,vaov:45,maxPitch:0,minPitch:0,autoLoad:!0})}},{key:"componentWillUnmount",value:function(){console.log("destroy"),this.viewer.destroy()}},{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement("div",{id:"panorama",style:{width:"100%",height:200}}))}}]),t}(i.a.Component),w=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).submission=a.props.submission,a.staticMapUrl="https://maps.googleapis.com/maps/api/staticmap?size=650x300&markers=|".concat(a.submission.lat,", ").concat(a.submission.lon,"&key=").concat("AIzaSyCmdA27Yq_H79ugY2uCSzNNZV_JuzBxh0Q"),a}return Object(m.a)(t,e),Object(r.a)(t,[{key:"handicappedText",value:function(){return this.submission.facilities.handicapped?this.submission.facilities.separateHandicapped?"Is handicapped accessible (Has separate handicapped toilet)":"Is handicapped accessible (Handicapped cubicle inside toilet)":"Is handicapped accessible"}},{key:"glanceStyle",value:function(e){return{textDecoration:e?"":"line-through",color:e?"":"gray"}}},{key:"render",value:function(){return i.a.createElement(E,null,i.a.createElement("h3",null,this.submission.name),i.a.createElement("img",{src:this.staticMapUrl,alt:"Static map preview"}),i.a.createElement(y,{url:this.submission.panorama.url}),i.a.createElement("h4",null,"At a glance"),i.a.createElement("ul",{style:{listStyle:"none"}},i.a.createElement("li",{style:this.glanceStyle(this.submission.facilities.male)},i.a.createElement("i",{className:"em-svg em-man-raising-hand"}),"Has Male toilet"),i.a.createElement("li",{style:this.glanceStyle(this.submission.facilities.female)},i.a.createElement("i",{className:"em-svg em-woman-raising-hand"}),"Has Female toilet"),i.a.createElement("li",{style:this.glanceStyle(this.submission.facilities.handicapped)},i.a.createElement("i",{className:"em-svg em-wheelchair"}),this.handicappedText()),i.a.createElement("li",{style:this.glanceStyle(this.submission.facilities.waterCooler)},i.a.createElement("i",{className:"em-svg em-potable_water"}),"Has water cooler"),i.a.createElement("li",{style:this.glanceStyle(this.submission.facilities.showerHeads)},i.a.createElement("i",{className:"em-svg em-shower"}),"Has shower heads"),i.a.createElement("li",{style:this.glanceStyle(this.submission.facilities.hose)},i.a.createElement("i",{className:"em-svg em-sweat_drops"}),"Has hose")))}}]),t}(i.a.Component),k=a(166),C=a(186),S=a(164),O=a(181),j=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return i.a.createElement(S.a,null,i.a.createElement(k.a,null,"Sort by"),i.a.createElement(O.a,{value:this.props.value,autoWidth:!0,onChange:this.props.handleSorting},i.a.createElement(C.a,{value:"name"},"Name"),i.a.createElement(C.a,{value:"date"},"Date (Newest first)"),i.a.createElement(C.a,{value:"status"},"Status")))}}]),t}(i.a.Component),H=a(169),D=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={remarksShown:!1},a.approval=a.props.status.approval,a.remarks=a.props.status.remarks,a}return Object(m.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this;return"rejected"===this.approval?i.a.createElement("div",null,i.a.createElement("p",{style:{color:"red"}},"Rejected ",i.a.createElement(H.a,{color:"primary",onClick:function(){return e.setState({remarksShown:!e.state.remarksShown})}},this.state.remarksShown?"Hide":"Show reason")),this.state.remarksShown&&i.a.createElement("p",null,this.remarks)):"pending"===this.approval?i.a.createElement("p",null,i.a.createElement("em",null,"Submission pending review")):i.a.createElement("p",{style:{color:"green"}},"Approved!")}}]),t}(i.a.Component),I=a(81),L=a.n(I),A=a(170),T=a(171),M=a(173),U=a(172);function P(e,t){return e.submission.name.localeCompare(t.submission.name)}function x(e,t){return t.submission.date.toDate()-e.submission.date.toDate()}function N(e,t){var a,n;switch(e.submission.status.approval){case"rejected":a=-1;break;case"approved":a=0;break;default:a=1}switch(t.submission.status.approval){case"rejected":n=-1;break;case"approved":n=0;break;default:n=1}return a-n}var R=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).submission=a.props.children.submission,a}return Object(m.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this;return i.a.createElement("div",null,i.a.createElement("h4",null,this.submission.name),i.a.createElement(D,{status:this.submission.status}),i.a.createElement("div",null,i.a.createElement(H.a,{variant:"contained",color:this.props.children.id===this.props.previewId?"secondary":"default",onClick:this.props.children.id===this.props.previewId?this.props.handleHide:function(){return e.props.handlePreview(e.props.children.id)}},this.props.children.id===this.props.previewId?"Hide":"Preview")," ",i.a.createElement(H.a,{variant:"contained",color:"primary",onClick:function(){return e.props.handleEdit(e.submission,e.props.children.id)}},"Edit")," ",i.a.createElement(H.a,{variant:"contained",color:"secondary",onClick:function(){return e.props.handleDelete(e.submission.panorama.fileName,e.props.children.id)}},"Delete",i.a.createElement(L.a,null))),i.a.createElement("br",null),i.a.createElement("div",{style:{color:"gray",fontSize:"80%"}},"Submitted:"," ",this.submission.date.toDate().toLocaleString("default",{day:"numeric",month:"long",year:"numeric",hour:"numeric",minute:"numeric",second:"numeric"})),i.a.createElement("br",null),this.props.children.id===this.props.previewId&&i.a.createElement(w,{submission:this.submission}))}}]),t}(i.a.Component),F=function(e){function t(e){var a;Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={submissions:[],previewId:"",loading:!0,sortBy:"name"};var n=[];return a.props.doc.collection("submissions").get().then(function(e){return e.forEach(function(e){n.push({submission:e.data(),id:e.id})})}).then(function(){n.sort(P),a.setState({submissions:n,loading:!1})}),a.handlePreview=a.handlePreview.bind(Object(f.a)(a)),a.handleHide=a.handleHide.bind(Object(f.a)(a)),a.handleSorting=a.handleSorting.bind(Object(f.a)(a)),a}return Object(m.a)(t,e),Object(r.a)(t,[{key:"handlePreview",value:function(e){this.setState({previewId:e})}},{key:"handleHide",value:function(){this.setState({previewId:""})}},{key:"handleSorting",value:function(e){var t=this.state.submissions.slice();switch(e.target.value){case"name":t.sort(P);break;case"date":t.sort(x);break;case"status":t.sort(N)}this.setState({submissions:t,sortBy:e.target.value})}},{key:"render",value:function(){var e=this;return i.a.createElement("div",null,this.state.loading&&i.a.createElement("span",null,"Loading... ..."),!this.state.loading&&0===this.state.submissions.length&&i.a.createElement("span",null,"You have not created any submissions (yet!)"),!this.state.loading&&0!==this.state.submissions.length&&i.a.createElement("div",null,i.a.createElement("br",null),i.a.createElement(j,{key:this.state.sortBy,value:this.state.sortBy,handleSorting:this.handleSorting}),i.a.createElement(A.a,null,i.a.createElement(T.a,null,this.state.submissions.map(function(t,a){return i.a.createElement(U.a,{key:a},i.a.createElement(M.a,null,i.a.createElement(R,{key:e.state.sortBy,handleEdit:e.props.handleEdit,handleDelete:e.props.handleDelete,handlePreview:e.handlePreview,handleHide:e.handleHide,previewId:e.state.previewId},t)))})))))}}]),t}(i.a.Component),z=a(82),W=a.n(z),B=a(183),_=a(182),J=a(175),Y=a(132),V=a(174),q=a(124),G=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={name:"",lat:0,lon:0,myLat:0,myLon:0,handicapped:!1,separateHandicapped:!1,hose:!1,showerHeads:!1,male:!1,female:!1,waterCooler:!1,progress:0,progressShown:!1,error:!1,submissionsShown:!1,edit:!1,panorama:{},editPanorama:!1,editDocId:""},a.fileInput=i.a.createRef(),a.db=b.firestore(),a.storage=b.storage(),a.doc=a.db.collection("userSubmissions").doc(a.props.currentUser.uid),a.handleInputChange=a.handleInputChange.bind(Object(f.a)(a)),a.handleMapClick=a.handleMapClick.bind(Object(f.a)(a)),a.updateMyLocation=a.updateMyLocation.bind(Object(f.a)(a)),a.setToCurrentLocation=a.setToCurrentLocation.bind(Object(f.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(f.a)(a)),a.handleEdit=a.handleEdit.bind(Object(f.a)(a)),a.handleDelete=a.handleDelete.bind(Object(f.a)(a)),a}return Object(m.a)(t,e),Object(r.a)(t,[{key:"handleInputChange",value:function(e){var t,a="checkbox"===e.target.type?e.target.checked:e.target.value;"handicapped"!==e.target.name?this.setState(Object(g.a)({},e.target.name,a)):this.setState((t={},Object(g.a)(t,e.target.name,a),Object(g.a)(t,"separateHandicapped",a&&this.state.separateHandicapped),t))}},{key:"handleMapClick",value:function(e,t){this.setState({lat:e,lon:t})}},{key:"updateMyLocation",value:function(e,t){this.setState({myLat:e,myLon:t})}},{key:"setToCurrentLocation",value:function(e){e.preventDefault(),this.setState({lat:this.state.myLat,lon:this.state.myLon})}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault(),this.state.edit&&!this.state.editPanorama?this.doc.collection("submissions").doc().set({facilities:{female:this.state.female,handicapped:this.state.handicapped,hose:this.state.hose,male:this.state.male,separateHandicapped:this.state.separateHandicapped,showerHeads:this.state.showerHeads,waterCooler:this.state.waterCooler},lat:this.state.lat,lon:this.state.lon,name:this.state.name.trim(),panorama:this.state.panorama,date:new Date(Date.now()),status:{approval:"pending",remarks:""}}).then(function(){t.doc.collection("submissions").doc(t.state.editDocId).delete()}).then(function(){return window.location.reload()}):null!=this.fileInput.current.files[0]&&/image\/*/g.test(this.fileInput.current.files[0].type)?W.a.imageFileResizer(this.fileInput.current.files[0],4096,4096,"JPEG",70,0,function(e){t.setState({progressShown:!0});var a="".concat(t.state.name," - ").concat(q(),".jpeg"),n=t.storage.ref().child(a).put(e);n.on(b.storage.TaskEvent.STATE_CHANGED,function(e){var a=e.bytesTransferred/e.totalBytes*100;t.setState({progress:a})},function(e){t.setState({error:!0})},function(){n.snapshot.ref.getDownloadURL().then(function(e){t.doc.set({currentUser:{name:t.props.currentUser.displayName,email:t.props.currentUser.email,photoURL:t.props.currentUser.photoURL,uid:t.props.currentUser.uid}}),t.doc.collection("submissions").doc().set({facilities:{female:t.state.female,handicapped:t.state.handicapped,hose:t.state.hose,male:t.state.male,separateHandicapped:t.state.separateHandicapped,showerHeads:t.state.showerHeads,waterCooler:t.state.waterCooler},lat:t.state.lat,lon:t.state.lon,name:t.state.name.trim(),panorama:{url:e,fileName:a},date:new Date(Date.now()),status:{approval:"pending",remarks:""}}).then(function(){t.state.edit&&(t.doc.collection("submissions").doc(t.state.editDocId).delete(),t.storage.ref().child(t.state.panorama.fileName).delete())}).then(function(){return window.location.reload()})})})},"blob"):alert("Please make sure file uploaded is an image")}},{key:"handleDelete",value:function(e,t){var a=this;window.confirm("Are you sure you want to delete this submission?")&&this.doc.collection("submissions").doc(t).delete().then(function(){return a.storage.ref().child(e).delete().then(function(){return window.location.reload()})})}},{key:"handleEdit",value:function(e,t){window.scrollTo(0,0),this.setState({edit:!0,female:e.facilities.female,male:e.facilities.male,handicapped:e.facilities.handicapped,separateHandicapped:e.facilities.separateHandicapped,showerHeads:e.facilities.showerHeads,waterCooler:e.facilities.waterCooler,hose:e.facilities.hose,lat:e.lat,lon:e.lon,name:e.name,panorama:e.panorama,editDocId:t})}},{key:"render",value:function(){var e=this;return i.a.createElement(E,null,this.state.edit&&i.a.createElement("h6",null,"Editing submission"),i.a.createElement("form",{onSubmit:this.handleSubmit},i.a.createElement(B.a,{label:"Name",placeholder:"Enter toilet name",fullWidth:!0,margin:"normal",variant:"outlined",InputLabelProps:{shrink:!0},name:"name",onChange:this.handleInputChange,value:this.state.name}),i.a.createElement(H.a,{onClick:this.setToCurrentLocation,variant:"contained"},"Set Lat Lon to current location"),i.a.createElement("br",null),i.a.createElement(B.a,{style:{marginRight:"1em"},label:"Latitude",margin:"normal",variant:"outlined",name:"lat",onChange:this.handleInputChange,value:this.state.lat}),i.a.createElement(B.a,{label:"Longitude",margin:"normal",variant:"outlined",name:"lon",onChange:this.handleInputChange,value:this.state.lon}),i.a.createElement(v,{handleMapClick:this.handleMapClick,updateMyLocation:this.updateMyLocation}),i.a.createElement("br",null),i.a.createElement(Y.a,{component:"legend"},"Facilities"),i.a.createElement(V.a,null,i.a.createElement(J.a,{control:i.a.createElement(_.a,{checked:this.state.male,onChange:this.handleInputChange,name:"male"}),label:"Male"}),i.a.createElement(J.a,{control:i.a.createElement(_.a,{checked:this.state.female,onChange:this.handleInputChange,name:"female"}),label:"Female"}),i.a.createElement(J.a,{control:i.a.createElement(_.a,{checked:this.state.handicapped,onChange:this.handleInputChange,name:"handicapped"}),label:"Handicapped"}),i.a.createElement(J.a,{control:i.a.createElement(_.a,{checked:this.state.separateHandicapped,onChange:this.handleInputChange,name:"separateHandicapped",disabled:!this.state.handicapped}),label:"Separate Handicapped"}),i.a.createElement(J.a,{control:i.a.createElement(_.a,{checked:this.state.hose,onChange:this.handleInputChange,name:"hose"}),label:"Hose"}),i.a.createElement(J.a,{control:i.a.createElement(_.a,{checked:this.state.showerHeads,onChange:this.handleInputChange,name:"showerHeads"}),label:"Shower Heads"}),i.a.createElement(J.a,{control:i.a.createElement(_.a,{checked:this.state.waterCooler,onChange:this.handleInputChange,name:"waterCooler"}),label:"Water Cooler"})),i.a.createElement("br",null),this.state.edit&&i.a.createElement("div",null,i.a.createElement(J.a,{control:i.a.createElement(_.a,{checked:this.state.editPanorama,onChange:this.handleInputChange,name:"editPanorama"}),label:"Edit Panorama image"}),i.a.createElement("br",null)),i.a.createElement("input",{type:"file",name:"paranomaPath",accept:"image/*",ref:this.fileInput,id:"contained-button-file",style:{display:"none"}}),(!this.state.edit||this.state.editPanorama)&&i.a.createElement("label",{htmlFor:"contained-button-file"},i.a.createElement(H.a,{variant:"contained",component:"span"},"Select panorama image"),null!=this.fileInput.current&&null!=this.fileInput.current.files[0]&&" ".concat(this.fileInput.current.files[0].name)),i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement(H.a,{variant:"contained",color:"primary",type:"submit",disabled:""===this.state.name||0===this.state.lat||0===this.state.lon},"Submit"),i.a.createElement("span",null,this.state.progressShown&&" "+Math.floor(this.state.progress)+"%"),i.a.createElement("p",null,this.state.error&&"An error occured, please refresh the page and try again"),this.state.edit&&i.a.createElement(H.a,{variant:"contained",color:"secondary",onClick:function(){return window.location.reload()}},"Cancel")),i.a.createElement(H.a,{color:"secondary",onClick:function(){return e.setState({submissionsShown:!e.state.submissionsShown})}},"".concat(this.state.submissionsShown?"Hide":"Show"," your submissions")),this.state.submissionsShown&&i.a.createElement(F,{uid:this.props.currentUser.uid,doc:this.doc,handleEdit:this.handleEdit,handleDelete:this.handleDelete}))}}]),t}(i.a.Component),Q=a(32),Z=a(180),K=a(168),X=a(167),$=a(185),ee=a(176),te=a(177),ae=a(178),ne=a(179),ie=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).submissionsDb=b.firestore().collection("users"),a.toiletDb=b.firestore().collection("toilets"),a.state={submissions:[],dialogOpened:!1,submissionToDelete:{},submissionToApprove:{}},a.getAllSubmissions(),a}return Object(m.a)(t,e),Object(r.a)(t,[{key:"componentWiUpdate",value:function(){this.getAllSubmissions()}},{key:"getAllSubmissions",value:function(){var e=this,t=[];this.submissionsDb.get().then(function(e){e.forEach(function(e){t.push(e.data().uid)})}).then(function(){t.forEach(function(t){return e.getSubmissionsForUser(t)})}).catch(function(e){alert(e)})}},{key:"getSubmissionsForUser",value:function(e){var t=this,a=[];this.submissionsDb.doc(e).collection("submissions").get().then(function(t){t.forEach(function(t){a.push({userUid:e,isFemale:t.data().facilities.female,isMale:t.data().facilities.male,isHandicapped:t.data().facilities.handicapped,isSeparateHandicapped:t.data().facilities.separateHandicapped,hasHose:t.data().facilities.hose,hasShowerHeads:t.data().facilities.showerHeads,hasWaterCooler:t.data().facilities.waterCooler,lat:t.data().lat,lon:t.data().lon,name:t.data().name,paranomaUrl:t.data().paranomaUrl,status:t.data().status,isEditing:!1})})}).then(function(){t.setState(function(e){return{submissions:[].concat(Object(Q.a)(e.submissions),[a])}})}).then(function(){t.setState(function(e){return{submissions:e.submissions.flatMap(function(e){return e})}}),console.log(t.state.submissions)})}},{key:"generateFacilities",value:function(e){var t="";return e.isMale&&(t+="\ud83d\ude4b\u200d\u2642\ufe0f"),e.isFemale&&(t+="\ud83d\ude4b\u200d"),e.hasWaterCooler&&(t+="\ud83d\udeb0"),e.hasShowerHeads&&(t+="\ud83d\udebf"),e.hasHose&&(t+="\ud83d\udca6"),e.isHandicapped&&(t+="\u267f"),e.isSeparateHandicapped&&(t+="\ud83d\ude2d"),t}},{key:"submissionAction",value:function(e){var t=this;return i.a.createElement(S.a,null,i.a.createElement(O.a,{value:[10,20,30],onChange:function(a){var n=t.state.submissions[e];switch(a.target.value){case"Approved":t.triggerDialogToConfirmApprove(n,e);break;case"Edit":var i=Object(Q.a)(t.state.submissions);n.isEditing=!0,i[e]=n,t.setState({submissions:i,submissionIndex:e,submissionToEdit:n});break;case"Rejected":t.triggerDialogToConfirmDelete(n,e)}}},i.a.createElement(C.a,{value:"Edit"},"Edit"),i.a.createElement(C.a,{value:"Approved"},"Approved"),i.a.createElement(C.a,{value:"Rejected"},"Rejected")))}},{key:"triggerDialogToConfirmApprove",value:function(e,t){this.setState({submissionToApprove:e,submissionIndex:t,approveDialogOpened:!0})}},{key:"approveSubmission",value:function(){var e=this,t=Object(Q.a)(this.state.submissions),a=this.state.submissionToApprove;a.status="Approved",t[this.state.submissionIndex]=a,this.submissionsDb.doc(this.state.submissionToApprove.userUid).collection("submissions").doc(this.state.submissionToApprove.name).update({status:"Approved"}),this.toiletDb.doc(a.name).set({facilities:{female:a.isFemale,handicapped:a.isHandicapped,hose:a.hasHose,male:a.isMale,separateHandicapped:a.isSeparateHandicapped,showerHeads:a.hasShowerHeads,waterCooler:a.hasWaterCooler},lat:a.lat,lon:a.lon,name:a.name,paranomaUrl:a.paranomaUrl}).then(function(){e.setState({submissions:t,approveDialogOpened:!1}),alert(a.name+" has been approved!")})}},{key:"triggerDialogToConfirmDelete",value:function(e,t){this.setState({submissionToDelete:e,submissionIndex:t,deleteDialogOpened:!0})}},{key:"deleteSubmission",value:function(){var e=this;this.submissionsDb.doc(this.state.submissionToDelete.userUid).collection("submissions").doc(this.state.submissionToDelete.name).delete().then(function(){e.setState({deleteDialogOpened:!1}),e.getAllSubmissions(),alert(e.state.submissionToDelete.name+" has been deleted forever"),window.location.reload()})}},{key:"handleConfirmEdit",value:function(e){var t=this,a=this.state.submissionToEdit;this.submissionsDb.doc(this.state.submissionToEdit.userUid).collection("submissions").doc(this.state.tempName).set({facilities:{female:a.isFemale,handicapped:a.isHandicapped,hose:a.hasHose,male:a.isMale,separateHandicapped:a.isSeparateHandicapped,showerHeads:a.hasShowerHeads,waterCooler:a.hasWaterCooler},lat:a.lat,lon:a.lon,name:this.state.tempName,paranomaUrl:a.paranomaUrl}).then(function(){var e=Object(Q.a)(t.state.submissions);a.isEditing=!1,e[t.state.submissionIndex]=a,t.submissionsDb.doc(t.state.submissionToEdit.userUid).collection("submissions").doc(t.state.submissionToEdit.name).delete().then(function(){t.setState({submissions:e}),alert("Successfully edited!"),window.location.reload()}).catch(function(e){return alert(e)})})}},{key:"generateTable",value:function(){var e=this,t=-1;return this.state.submissions.map(function(a){return t++,a.isEditing?i.a.createElement(U.a,null,i.a.createElement(M.a,null,i.a.createElement(X.a,{defaultValue:e.state.submissions[t].name,multiline:!0,fullWidth:!0,onChange:function(t){return e.setState({tempName:t.target.value,submissionToEdit:a})}})),i.a.createElement(M.a,null,a.userUid),i.a.createElement(M.a,null,e.generateFacilities(a)),i.a.createElement(M.a,null,void 0==a.status?"Pending":a.status," "),i.a.createElement(M.a,null,i.a.createElement(H.a,{size:"small",onClick:function(){e.handleConfirmEdit(t)}}," Confirm Changes "),i.a.createElement(H.a,{size:"small",onClick:function(){var a=Object(Q.a)(e.state.submissions),n=e.state.submissionToEdit;n.isEditing=!1,a[t]=n,e.setState({submissions:a})}}," Cancel "))):i.a.createElement(U.a,null,i.a.createElement(M.a,null,a.name),i.a.createElement(M.a,null,a.userUid),i.a.createElement(M.a,null,e.generateFacilities(a)),i.a.createElement(M.a,null,void 0==a.status?"Pending":a.status," "),i.a.createElement(M.a,null,e.submissionAction(t)))})}},{key:"render",value:function(){var e=this;return i.a.createElement(K.a,{style:{margin:20}},i.a.createElement($.a,{onClose:function(){e.setState({approveDialogOpened:!1})},open:this.state.approveDialogOpened},i.a.createElement(ee.a,null,"Are you sure?"),i.a.createElement(te.a,null,i.a.createElement(ae.a,null,"Once you press approve the submission, "+this.state.submissionToApprove.name+" will be pushed to the main database")),i.a.createElement(ne.a,null,i.a.createElement(H.a,{onClick:function(){return e.approveSubmission()}},"Approve"),i.a.createElement(H.a,{onClick:function(){e.setState({approveDialogOpened:!1})}},"Cancel"))),i.a.createElement($.a,{onClose:function(){e.setState({deleteDialogOpened:!1})},open:this.state.deleteDialogOpened},i.a.createElement(ee.a,null,"Are you sure?"),i.a.createElement(te.a,null,i.a.createElement(ae.a,null,"Once you press delete there is no turning back, the submission, "+this.state.submissionToDelete.name+" will forever be gone!")),i.a.createElement(ne.a,null,i.a.createElement(H.a,{onClick:function(){return e.deleteSubmission()}},"Delete"),i.a.createElement(H.a,{onClick:function(){e.setState({deleteDialogOpened:!1})}},"Cancel"))),i.a.createElement(A.a,null,i.a.createElement(Z.a,null,i.a.createElement(U.a,null,i.a.createElement(M.a,null,"Location"),i.a.createElement(M.a,null,"User "),i.a.createElement(M.a,null,"Facilities"),i.a.createElement(M.a,null,"Status"),i.a.createElement(M.a,null,"Action"))),i.a.createElement(T.a,null,this.generateTable())))}}]),t}(i.a.Component),se={signInOptions:[b.auth.GoogleAuthProvider.PROVIDER_ID]},oe=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={isSignedIn:!1},a}return Object(m.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.unregisterAuthObserver=b.auth().onAuthStateChanged(function(t){return e.setState({isSignedIn:!!t})})}},{key:"render",value:function(){return this.state.isSignedIn?"lowzxx@gmail.com"==b.auth().currentUser.email||"nelsontkyi@gmail.comz"==b.auth().currentUser.email?i.a.createElement("div",null,i.a.createElement(ie,null),i.a.createElement("div",{style:{textAlign:"center"}},i.a.createElement("button",{onClick:function(){return b.auth().signOut()}},"Sign Out"))):i.a.createElement("div",null,i.a.createElement(G,{currentUser:b.auth().currentUser}),i.a.createElement("div",{style:{textAlign:"center"}},i.a.createElement("button",{onClick:function(){return b.auth().signOut()}},"Sign Out"))):i.a.createElement("div",null,i.a.createElement("h1",null,"My App"),i.a.createElement("p",null,"Please sign-in:"),i.a.createElement(h.a,{uiConfig:se,firebaseAuth:b.auth()}))}}]),t}(i.a.Component),le=a(83),re=a.n(le),ce=a(84),ue=a.n(ce),me=a(85),de=new re.a(ue.a);de.injectStyles(),Object(me.a)(de),o.a.render(i.a.createElement(oe,null),document.getElementById("root"))},96:function(e,t,a){e.exports=a(130)}},[[96,1,2]]]);
//# sourceMappingURL=main.e113ba05.chunk.js.map