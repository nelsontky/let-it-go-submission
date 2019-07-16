(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{129:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),s=a(11),o=a.n(s),r=a(13),l=a(9),c=a(15),u=a(14),d=a(16),m=function(e){var t=e.children;return i.a.createElement("div",{style:{margin:"3rem auto",maxWidth:650,padding:"0 1rem"}},t)},h=a(68);a(102),a(71),a(130);h.initializeApp({apiKey:"AIzaSyCmdA27Yq_H79ugY2uCSzNNZV_JuzBxh0Q",authDomain:"let-it-go-e6229.firebaseapp.com",databaseURL:"https://let-it-go-e6229.firebaseio.com",projectId:"let-it-go-e6229",storageBucket:"let-it-go-e6229.appspot.com",messagingSenderId:"917575844853",appId:"1:917575844853:web:88ec0cbe059a0d43"});var p=h,b={color:"gray",fontFamily:"Georgia, serif",fontSize:"1.5em",fontStyle:"italic",lineHeight:"1.4",margin:"0",textShadow:"0 1px white",zIndex:"600",textAlign:"center"},f=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={},a.unmounted=!1,a.db=p.firestore(),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.db.collection("toiletQuotes").doc("quotes").get().then(function(t){var a=t.data().quotes,n=a[Math.floor(Math.random()*a.length)];e.unmounted||e.setState({quote:"\u201c"+n+"\u201d"})}).catch(function(){return e.setState({quote:"\u201cFeces are meant to be released in peace.\u201d"})})}},{key:"componentWillUnmount",value:function(){this.unmounted=!0}},{key:"render",value:function(){return i.a.createElement("p",{style:b},this.state.quote)}}]),t}(i.a.Component),g=a(39),v=function(e){function t(){return Object(r.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.viewer=window.pannellum.viewer("panorama",{type:"equirectangular",panorama:this.props.url,vaov:45,maxPitch:0,minPitch:0,autoLoad:!0})}},{key:"componentWillUnmount",value:function(){this.viewer.destroy()}},{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement("div",{id:"panorama",style:{width:"100%",height:200}}))}}]),t}(i.a.Component),E=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).submission=a.props.submission,a.staticMapUrl="https://maps.googleapis.com/maps/api/staticmap?size=650x300&markers=|".concat(a.submission.lat,", ").concat(a.submission.lon,"&key=").concat("AIzaSyCmdA27Yq_H79ugY2uCSzNNZV_JuzBxh0Q"),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"handicappedText",value:function(){return this.submission.facilities.handicapped?this.submission.facilities.separateHandicapped?"Is handicapped accessible (Has separate handicapped toilet)":"Is handicapped accessible (Handicapped cubicle inside toilet)":"Is handicapped accessible"}},{key:"glanceStyle",value:function(e){return{textDecoration:e?"":"line-through",color:e?"":"gray"}}},{key:"render",value:function(){return i.a.createElement(m,null,i.a.createElement("h3",null,this.submission.name),i.a.createElement("img",{src:this.staticMapUrl,alt:"Static map preview"}),i.a.createElement(v,{url:this.submission.panorama.url}),i.a.createElement("h4",null,"At a glance"),i.a.createElement("ul",{style:{listStyle:"none"}},i.a.createElement("li",{style:this.glanceStyle(this.submission.facilities.male)},i.a.createElement("i",{className:"em-svg em-man-raising-hand"}),"Has Male toilet"),i.a.createElement("li",{style:this.glanceStyle(this.submission.facilities.female)},i.a.createElement("i",{className:"em-svg em-woman-raising-hand"}),"Has Female toilet"),i.a.createElement("li",{style:this.glanceStyle(this.submission.facilities.handicapped)},i.a.createElement("i",{className:"em-svg em-wheelchair"}),this.handicappedText()),i.a.createElement("li",{style:this.glanceStyle(this.submission.facilities.waterCooler)},i.a.createElement("i",{className:"em-svg em-potable_water"}),"Has water cooler"),i.a.createElement("li",{style:this.glanceStyle(this.submission.facilities.showerHeads)},i.a.createElement("i",{className:"em-svg em-shower"}),"Has shower heads"),i.a.createElement("li",{style:this.glanceStyle(this.submission.facilities.hose)},i.a.createElement("i",{className:"em-svg em-sweat_drops"}),"Has hose")))}}]),t}(i.a.Component),w=a(175),y=a(177),k=a(168),S=a(176),C=a(167),j=a(166),O=a(163),H=a(180),I=a(185),D=a(169),L=a(182),A=a(184),M=a(171),R=a(172),x=a(173),T=a(174),U=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).submissionsDb=p.firestore().collection("userSubmissions"),a.toiletDb=p.firestore().collection("toilets"),a.reviewsDb=p.firestore().collection("reviews"),a.state={submissions:[],submissionToReject:{},submissionToApprove:{},remarks:"",previewRow:null},a.getAllSubmissions(),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"getAllSubmissions",value:function(){var e=this,t=[],a=new Map;this.submissionsDb.get().then(function(n){n.forEach(function(n){var i=n.data().currentUser.uid;e.submissionsDb.doc(i).collection("submissions").onSnapshot(function(n){n.forEach(function(e){var n={userUid:i,docId:e.id,date:e.data().date,isFemale:e.data().facilities.female,isMale:e.data().facilities.male,isHandicapped:e.data().facilities.handicapped,isSeparateHandicapped:e.data().facilities.separateHandicapped,hasHose:e.data().facilities.hose,hasShowerHeads:e.data().facilities.showerHeads,hasWaterCooler:e.data().facilities.waterCooler,lat:e.data().lat,lon:e.data().lon,name:e.data().name,paranomaUrl:e.data().panorama.url,status:e.data().status.approval,remarks:e.data().status.remarks};a.has(n.docId)||(a.set(n.docId,!0),t.push(n))}),n.docChanges().forEach(function(e){var a=e.doc.id,n=t.find(function(e){return e.docId===a}),s=n.rowId;t[s]={userUid:i,docId:n.id,date:e.doc.data().date,isFemale:e.doc.data().facilities.female,isMale:e.doc.data().facilities.male,isHandicapped:e.doc.data().facilities.handicapped,isSeparateHandicapped:e.doc.data().facilities.separateHandicapped,hasHose:e.doc.data().facilities.hose,hasShowerHeads:e.doc.data().facilities.showerHeads,hasWaterCooler:e.doc.data().facilities.waterCooler,lat:e.doc.data().lat,lon:e.doc.data().lon,name:e.doc.data().name,paranomaUrl:e.doc.data().panorama.url,status:e.doc.data().status.approval,remarks:e.doc.data().status.remarks}});var s=-1;t.map(function(e){return s++,e.rowId=s,e}),e.setState({submissions:t})})})})}},{key:"generateFacilities",value:function(e){var t="";return e.isMale&&(t+="\ud83d\ude4b\u200d\u2642\ufe0f"),e.isFemale&&(t+="\ud83d\ude4b\u200d"),e.hasWaterCooler&&(t+="\ud83d\udeb0"),e.hasShowerHeads&&(t+="\ud83d\udebf"),e.hasHose&&(t+="\ud83d\udca6"),e.isHandicapped&&(t+="\u267f"),e.isSeparateHandicapped&&(t+="\ud83d\ude2d"),t}},{key:"submissionAction",value:function(e){var t=this;return i.a.createElement(O.a,null,i.a.createElement(H.a,{value:[10,20,30],onChange:function(a){var n=t.state.submissions[e];switch(a.target.value){case"Approve":t.triggerDialogToConfirmApprove(n,e);break;case"Reject":t.handleRejectSubmissionClicked(n,e)}}},i.a.createElement(I.a,{value:"Approve"},"Approve"),i.a.createElement(I.a,{value:"Reject"},"Reject")))}},{key:"triggerDialogToConfirmApprove",value:function(e,t){this.setState({submissionToApprove:e,submissionIndex:t,approveDialogOpened:!0})}},{key:"approveSubmission",value:function(){var e=this,t=this.state.remarks[this.state.submissionIndex],a=this.state.submissionToApprove;this.submissionsDb.doc(this.state.submissionToApprove.userUid).collection("submissions").doc(this.state.submissionToApprove.name).update({status:{approval:"approved",remarks:t}}),this.toiletDb.doc(a.name).set({facilities:{female:a.isFemale,handicapped:a.isHandicapped,hose:a.hasHose,male:a.isMale,separateHandicapped:a.isSeparateHandicapped,showerHeads:a.hasShowerHeads,waterCooler:a.hasWaterCooler},lat:a.lat,lon:a.lon,name:a.name,paranomaUrl:a.paranomaUrl}).then(function(){e.setState({approveDialogOpened:!1})}),this.reviewsDb.doc(a.name).set({})}},{key:"handleRejectSubmissionClicked",value:function(e,t){this.setState({rejectDialogOpened:!0,submissionToReject:e,submissionIndex:t})}},{key:"rejectSubmission",value:function(){var e=this,t=this.state.remarks[this.state.submissionIndex];this.submissionsDb.doc(this.state.submissionToReject.userUid).collection("submissions").doc(this.state.submissionToReject.docId).update({status:{approval:"rejected",remarks:t||this.state.submissionToReject.remarks}}).then(function(){e.setState({rejectDialogOpened:!1})})}},{key:"handleTextChange",value:function(e,t){this.setState({remarks:Object(g.a)({},t,e.target.value)})}},{key:"generateTable",value:function(){var e=this;return this.state.submissions.map(function(t,a){return i.a.createElement(i.a.Fragment,{key:a},i.a.createElement(C.a,null,i.a.createElement(k.a,null,t.name+" ",t.rowId!==e.state.previewRow?i.a.createElement(D.a,{onClick:function(){return e.setState({previewRow:t.rowId})},color:"primary"},"Preview"):i.a.createElement(D.a,{onClick:function(){return e.setState({previewRow:null})},color:"secondary"},"Hide")),i.a.createElement(k.a,null,e.generateFacilities(t)),i.a.createElement(k.a,{size:"small"},i.a.createElement(L.a,{multiline:!0,defaultValue:t.remarks,fullWidth:!0,margin:"dense",inputProps:{style:{fontSize:15}},onChange:function(a){e.handleTextChange(a,t.rowId)}})),i.a.createElement(k.a,null,null==t.status?"Pending":t.status," "),i.a.createElement(k.a,null,e.submissionAction(t.rowId))),e.state.previewRow===t.rowId&&i.a.createElement(C.a,null,i.a.createElement(k.a,{colSpan:5},i.a.createElement(E,{submission:Object.assign({panorama:{url:t.paranomaUrl},facilities:{hose:t.hasHose,showerHeads:t.hasShowerHeads,waterCooler:t.hasWaterCooler,male:t.isMale,separateHandicapped:t.isSeparateHandicapped,handicapped:t.isHandicapped,female:t.isFemale}},t)}))))})}},{key:"render",value:function(){var e=this;return i.a.createElement(j.a,{style:{margin:20}},i.a.createElement(A.a,{onClose:function(){e.setState({approveDialogOpened:!1})},open:this.state.approveDialogOpened},i.a.createElement(M.a,null,"Are you sure?"),i.a.createElement(R.a,null,i.a.createElement(x.a,null,"Do you really want to approve "+this.state.submissionToApprove.name+" with the remarks "+(this.state.remarks[this.state.submissionIndex]?this.state.remarks[this.state.submissionIndex]:this.state.submissionToApprove.remarks)+"?")),i.a.createElement(T.a,null,i.a.createElement(D.a,{onClick:function(){return e.approveSubmission()}},"Approve"),i.a.createElement(D.a,{onClick:function(){e.setState({approveDialogOpened:!1})}},"Cancel"))),i.a.createElement(A.a,{onClose:function(){e.setState({rejectDialogOpened:!1})},open:this.state.rejectDialogOpened},i.a.createElement(M.a,null,"Are you sure?"),i.a.createElement(R.a,null,i.a.createElement(x.a,null,"Do you really want to reject "+this.state.submissionToReject.name+" with the remarks "+(this.state.remarks[this.state.submissionIndex]?this.state.remarks[this.state.submissionIndex]:this.state.submissionToReject.remarks)+"?")),i.a.createElement(T.a,null,i.a.createElement(D.a,{onClick:function(){return e.rejectSubmission()}},"Reject"),i.a.createElement(D.a,{onClick:function(){e.setState({rejectDialogOpened:!1})}},"Cancel"))),i.a.createElement(w.a,{onRowSelection:this.onRowSelection},i.a.createElement(S.a,null,i.a.createElement(C.a,null,i.a.createElement(k.a,null,"Location"),i.a.createElement(k.a,null,"Facilities"),i.a.createElement(k.a,null,"Remarks "),i.a.createElement(k.a,null,"Status"),i.a.createElement(k.a,null,"Action"))),i.a.createElement(y.a,null,this.generateTable())))}}]),t}(i.a.Component),P=a(19),N=function(e){function t(){return Object(r.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"watchLocation",value:function(){var e=this;navigator.geolocation?this.id=navigator.geolocation.watchPosition(function(t){var a=t.coords.latitude,n=t.coords.longitude;e.props.updateMyLocation(a,n),e.myLocation.setPosition({lat:a,lng:n}),e.accuracyRadius.setCenter({lat:a,lng:n}),e.accuracyRadius.setRadius(t.coords.accuracy)},function(){return console.log("No permission")},{enableHighAccuracy:!0}):console.log("No permission")}},{key:"componentDidMount",value:function(){var e=this,t={lat:1.296675,lng:103.776396};this.map=new window.google.maps.Map(document.getElementById("map"),{zoom:13,center:t}),this.myLocation=new window.google.maps.Marker({position:t,map:this.map,icon:"https://raw.githubusercontent.com/nelsontky/let-it-go/master/assets/icons/locationMarker.png"}),this.accuracyRadius=new window.google.maps.Circle({map:this.map,center:t,radius:0,fillColor:"#00F",fillOpacity:.2,strokeWeight:0}),this.map.addListener("click",function(t){e.props.handleMapClick(t.latLng.lat(),t.latLng.lng()),null!=e.marker&&e.marker.setMap(null),e.marker=new window.google.maps.Marker({position:t.latLng,map:e.map})}),this.accuracyRadius.addListener("click",function(t){e.props.handleMapClick(t.latLng.lat(),t.latLng.lng()),null!=e.marker&&e.marker.setMap(null),e.marker=new window.google.maps.Marker({position:t.latLng,map:e.map})}),this.myLocation.addListener("click",function(){e.props.handleMapClick(e.myLocation.getPosition().lat(),e.myLocation.getPosition().lng()),null!=e.marker&&e.marker.setMap(null),e.marker=new window.google.maps.Marker({position:e.myLocation.getPosition(),map:e.map})});var a=this;var n=document.createElement("div");new function(e,t){var n=document.createElement("div");n.style.backgroundColor="#fff",n.style.border="2px solid #fff",n.style.borderRadius="3px",n.style.boxShadow="0 2px 6px rgba(0,0,0,.3)",n.style.cursor="pointer",n.style.textAlign="center",n.style.marginBottom="22px",n.style.height="31px",n.title="Click to recenter the map to location",e.appendChild(n);var i=document.createElement("div");i.innerHTML="<img src='https://i.imgur.com/raFRca2.png' />",n.appendChild(i),n.addEventListener("click",function(){t.setCenter(a.myLocation.getPosition())})}(n,this.map),n.index=1,this.map.controls[window.google.maps.ControlPosition.LEFT_BOTTOM].push(n),this.watchLocation()}},{key:"componentWillUnmount",value:function(){navigator.geolocation.clearWatch(this.id)}},{key:"render",value:function(){return i.a.createElement("div",{id:"map",style:{width:"100%",height:"300px"}})}}]),t}(i.a.Component),F=a(170),z=function(e){function t(){return Object(r.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return i.a.createElement(O.a,null,i.a.createElement(F.a,null,"Sort by"),i.a.createElement(H.a,{value:this.props.value,autoWidth:!0,onChange:this.props.handleSorting},i.a.createElement(I.a,{value:"name"},"Name"),i.a.createElement(I.a,{value:"date"},"Date (Newest first)"),i.a.createElement(I.a,{value:"status"},"Status")))}}]),t}(i.a.Component),W=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={remarksShown:!1},a.approval=a.props.status.approval,a.remarks=a.props.status.remarks,a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return"rejected"===this.approval?i.a.createElement("div",null,i.a.createElement("p",{style:{color:"red"}},"Rejected ",i.a.createElement(D.a,{color:"primary",onClick:function(){return e.setState({remarksShown:!e.state.remarksShown})}},this.state.remarksShown?"Hide":"Show reason")),this.state.remarksShown&&i.a.createElement("p",null,this.remarks)):"pending"===this.approval?i.a.createElement("p",null,i.a.createElement("em",null,"Submission pending review")):i.a.createElement("p",{style:{color:"green"}},"Approved!")}}]),t}(i.a.Component),B=a(79),_=a.n(B);function q(e,t){return e.submission.name.localeCompare(t.submission.name)}function G(e,t){return t.submission.date.toDate()-e.submission.date.toDate()}function J(e,t){var a,n;switch(e.submission.status.approval){case"rejected":a=-1;break;case"approved":a=0;break;default:a=1}switch(t.submission.status.approval){case"rejected":n=-1;break;case"approved":n=0;break;default:n=1}return a-n}var Y=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).submission=a.props.children.submission,a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return i.a.createElement("div",null,i.a.createElement("h4",null,this.submission.name),i.a.createElement(W,{status:this.submission.status}),i.a.createElement("div",null,i.a.createElement(D.a,{variant:"contained",color:this.props.children.id===this.props.previewId?"secondary":"default",onClick:this.props.children.id===this.props.previewId?this.props.handleHide:function(){return e.props.handlePreview(e.props.children.id)}},this.props.children.id===this.props.previewId?"Hide":"Preview")," ",i.a.createElement(D.a,{variant:"contained",color:"primary",onClick:function(){return e.props.handleEdit(e.submission,e.props.children.id)}},"Edit")," ",i.a.createElement(D.a,{variant:"contained",color:"secondary",onClick:function(){return e.props.handleDelete(e.submission.panorama.fileName,e.props.children.id)}},"Delete",i.a.createElement(_.a,null))),i.a.createElement("br",null),i.a.createElement("div",{style:{color:"gray",fontSize:"80%"}},"Submitted:"," ",this.submission.date.toDate().toLocaleString("default",{day:"numeric",month:"long",year:"numeric",hour:"numeric",minute:"numeric",second:"numeric"})),i.a.createElement("br",null),this.props.children.id===this.props.previewId&&i.a.createElement(E,{submission:this.submission}))}}]),t}(i.a.Component),V=function(e){function t(e){var a;Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={submissions:[],previewId:"",loading:!0,sortBy:"status"};var n=[];return a.props.doc.collection("submissions").get().then(function(e){return e.forEach(function(e){n.push({submission:e.data(),id:e.id})})}).then(function(){n.sort(J),a.setState({submissions:n,loading:!1})}),a.handlePreview=a.handlePreview.bind(Object(P.a)(a)),a.handleHide=a.handleHide.bind(Object(P.a)(a)),a.handleSorting=a.handleSorting.bind(Object(P.a)(a)),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"handlePreview",value:function(e){this.setState({previewId:e})}},{key:"handleHide",value:function(){this.setState({previewId:""})}},{key:"handleSorting",value:function(e){var t=this.state.submissions.slice();switch(e.target.value){case"name":t.sort(q);break;case"date":t.sort(G);break;case"status":t.sort(J)}this.setState({submissions:t,sortBy:e.target.value})}},{key:"render",value:function(){var e=this;return i.a.createElement("div",null,this.state.loading&&i.a.createElement("span",null,"Loading... ..."),!this.state.loading&&0===this.state.submissions.length&&i.a.createElement("span",null,"You have not created any submissions (yet!)"),!this.state.loading&&0!==this.state.submissions.length&&i.a.createElement("div",null,i.a.createElement("br",null),i.a.createElement(z,{key:this.state.sortBy,value:this.state.sortBy,handleSorting:this.handleSorting}),i.a.createElement(w.a,null,i.a.createElement(y.a,null,this.state.submissions.map(function(t,a){return i.a.createElement(C.a,{key:a},i.a.createElement(k.a,null,i.a.createElement(Y,{key:e.state.sortBy,handleEdit:e.props.handleEdit,handleDelete:e.props.handleDelete,handlePreview:e.handlePreview,handleHide:e.handleHide,previewId:e.state.previewId},t)))})))))}}]),t}(i.a.Component),Q=a(80),Z=a.n(Q),K=a(181),X=a(179),$=a(131),ee=a(178),te=a(121),ae=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={name:"",lat:0,lon:0,myLat:0,myLon:0,handicapped:!1,separateHandicapped:!1,hose:!1,showerHeads:!1,male:!1,female:!1,waterCooler:!1,progress:0,progressShown:!1,error:!1,submissionsShown:!1,edit:!1,panorama:{},editPanorama:!1,editDocId:""},a.fileInput=i.a.createRef(),a.db=p.firestore(),a.storage=p.storage(),a.doc=a.db.collection("userSubmissions").doc(a.props.currentUser.uid),a.handleInputChange=a.handleInputChange.bind(Object(P.a)(a)),a.handleMapClick=a.handleMapClick.bind(Object(P.a)(a)),a.updateMyLocation=a.updateMyLocation.bind(Object(P.a)(a)),a.setToCurrentLocation=a.setToCurrentLocation.bind(Object(P.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(P.a)(a)),a.handleEdit=a.handleEdit.bind(Object(P.a)(a)),a.handleDelete=a.handleDelete.bind(Object(P.a)(a)),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"handleInputChange",value:function(e){var t,a="checkbox"===e.target.type?e.target.checked:e.target.value;"handicapped"!==e.target.name?this.setState(Object(g.a)({},e.target.name,a)):this.setState((t={},Object(g.a)(t,e.target.name,a),Object(g.a)(t,"separateHandicapped",a&&this.state.separateHandicapped),t))}},{key:"handleMapClick",value:function(e,t){this.setState({lat:e,lon:t})}},{key:"updateMyLocation",value:function(e,t){this.setState({myLat:e,myLon:t})}},{key:"setToCurrentLocation",value:function(e){e.preventDefault(),this.setState({lat:this.state.myLat,lon:this.state.myLon})}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault(),this.state.edit&&!this.state.editPanorama?this.doc.collection("submissions").doc().set({facilities:{female:this.state.female,handicapped:this.state.handicapped,hose:this.state.hose,male:this.state.male,separateHandicapped:this.state.separateHandicapped,showerHeads:this.state.showerHeads,waterCooler:this.state.waterCooler},lat:this.state.lat,lon:this.state.lon,name:this.state.name.trim(),panorama:this.state.panorama,date:new Date(Date.now()),status:{approval:"pending",remarks:""}}).then(function(){t.doc.collection("submissions").doc(t.state.editDocId).delete()}).then(function(){return window.location.reload()}):null!=this.fileInput.current.files[0]&&/image\/*/g.test(this.fileInput.current.files[0].type)?Z.a.imageFileResizer(this.fileInput.current.files[0],4096,4096,"JPEG",70,0,function(e){t.setState({progressShown:!0});var a="".concat(t.state.name," - ").concat(te(),".jpeg"),n=t.storage.ref().child(a).put(e);n.on(p.storage.TaskEvent.STATE_CHANGED,function(e){var a=e.bytesTransferred/e.totalBytes*100;t.setState({progress:a})},function(e){t.setState({error:!0})},function(){n.snapshot.ref.getDownloadURL().then(function(e){t.doc.set({currentUser:{name:t.props.currentUser.displayName,email:t.props.currentUser.email,photoURL:t.props.currentUser.photoURL,uid:t.props.currentUser.uid}}),t.doc.collection("submissions").doc().set({facilities:{female:t.state.female,handicapped:t.state.handicapped,hose:t.state.hose,male:t.state.male,separateHandicapped:t.state.separateHandicapped,showerHeads:t.state.showerHeads,waterCooler:t.state.waterCooler},lat:t.state.lat,lon:t.state.lon,name:t.state.name.trim(),panorama:{url:e,fileName:a},date:new Date(Date.now()),status:{approval:"pending",remarks:""}}).then(function(){t.state.edit&&(t.doc.collection("submissions").doc(t.state.editDocId).delete(),t.storage.ref().child(t.state.panorama.fileName).delete())}).then(function(){return window.location.reload()})})})},"blob"):alert("Please make sure file uploaded is an image")}},{key:"handleDelete",value:function(e,t){var a=this;window.confirm("Are you sure you want to delete this submission?")&&this.doc.collection("submissions").doc(t).delete().then(function(){return a.storage.ref().child(e).delete().then(function(){return window.location.reload()})})}},{key:"handleEdit",value:function(e,t){window.scrollTo(0,0),this.setState({edit:!0,female:e.facilities.female,male:e.facilities.male,handicapped:e.facilities.handicapped,separateHandicapped:e.facilities.separateHandicapped,showerHeads:e.facilities.showerHeads,waterCooler:e.facilities.waterCooler,hose:e.facilities.hose,lat:e.lat,lon:e.lon,name:e.name,panorama:e.panorama,editDocId:t})}},{key:"render",value:function(){var e=this;return i.a.createElement(m,null,i.a.createElement("h1",null,"Submit to Let It Go"),this.state.edit&&i.a.createElement("h6",null,"Editing submission"),i.a.createElement("form",{onSubmit:this.handleSubmit},i.a.createElement(L.a,{label:"Name",placeholder:"Enter toilet name",fullWidth:!0,margin:"normal",variant:"outlined",InputLabelProps:{shrink:!0},name:"name",onChange:this.handleInputChange,value:this.state.name}),i.a.createElement(D.a,{onClick:this.setToCurrentLocation,variant:"contained"},"Set Lat Lon to current location"),i.a.createElement("br",null),i.a.createElement(L.a,{style:{marginRight:"1em"},label:"Latitude",margin:"normal",variant:"outlined",name:"lat",onChange:this.handleInputChange,value:this.state.lat}),i.a.createElement(L.a,{label:"Longitude",margin:"normal",variant:"outlined",name:"lon",onChange:this.handleInputChange,value:this.state.lon}),i.a.createElement(N,{handleMapClick:this.handleMapClick,updateMyLocation:this.updateMyLocation}),i.a.createElement("br",null),i.a.createElement($.a,{component:"legend"},"Facilities"),i.a.createElement(ee.a,null,i.a.createElement(X.a,{control:i.a.createElement(K.a,{checked:this.state.male,onChange:this.handleInputChange,name:"male"}),label:"Male"}),i.a.createElement(X.a,{control:i.a.createElement(K.a,{checked:this.state.female,onChange:this.handleInputChange,name:"female"}),label:"Female"}),i.a.createElement(X.a,{control:i.a.createElement(K.a,{checked:this.state.handicapped,onChange:this.handleInputChange,name:"handicapped"}),label:"Handicapped"}),i.a.createElement(X.a,{control:i.a.createElement(K.a,{checked:this.state.separateHandicapped,onChange:this.handleInputChange,name:"separateHandicapped",disabled:!this.state.handicapped}),label:"Separate Handicapped"}),i.a.createElement(X.a,{control:i.a.createElement(K.a,{checked:this.state.hose,onChange:this.handleInputChange,name:"hose"}),label:"Hose"}),i.a.createElement(X.a,{control:i.a.createElement(K.a,{checked:this.state.showerHeads,onChange:this.handleInputChange,name:"showerHeads"}),label:"Shower Heads"}),i.a.createElement(X.a,{control:i.a.createElement(K.a,{checked:this.state.waterCooler,onChange:this.handleInputChange,name:"waterCooler"}),label:"Water Cooler"})),i.a.createElement("br",null),this.state.edit&&i.a.createElement("div",null,i.a.createElement(X.a,{control:i.a.createElement(K.a,{checked:this.state.editPanorama,onChange:this.handleInputChange,name:"editPanorama"}),label:"Edit Panorama image"}),i.a.createElement("br",null)),i.a.createElement("input",{type:"file",name:"paranomaPath",accept:"image/*",ref:this.fileInput,id:"contained-button-file",style:{display:"none"}}),(!this.state.edit||this.state.editPanorama)&&i.a.createElement("label",{htmlFor:"contained-button-file"},i.a.createElement(D.a,{variant:"contained",component:"span"},"Select panorama image")),i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement(D.a,{variant:"contained",color:"primary",type:"submit",disabled:""===this.state.name||0===this.state.lat||0===this.state.lon},"Submit"),i.a.createElement("span",null,this.state.progressShown&&" "+Math.floor(this.state.progress)+"%"),i.a.createElement("p",null,this.state.error&&"An error occured, please refresh the page and try again"),this.state.edit&&i.a.createElement(D.a,{variant:"contained",color:"secondary",onClick:function(){return window.location.reload()}},"Cancel")),i.a.createElement(D.a,{color:"secondary",onClick:function(){return e.setState({submissionsShown:!e.state.submissionsShown})}},"".concat(this.state.submissionsShown?"Hide":"Show"," your submissions")),this.state.submissionsShown&&i.a.createElement(V,{uid:this.props.currentUser.uid,doc:this.doc,handleEdit:this.handleEdit,handleDelete:this.handleDelete}))}}]),t}(i.a.Component),ne=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={isAdmin:!0},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return i.a.createElement("div",null,i.a.createElement("div",{style:{textAlign:"center"}},i.a.createElement(D.a,{onClick:function(){return e.setState({isAdmin:!e.state.isAdmin})},variant:"contained",color:"secondary"},"Switch to ".concat(this.state.isAdmin?"submission":"admin"," portal"))),this.state.isAdmin?i.a.createElement(U,null):i.a.createElement(ae,{currentUser:this.props.currentUser}))}}]),t}(i.a.Component),ie=a(81),se=a.n(ie);var oe={signInOptions:[p.auth.GoogleAuthProvider.PROVIDER_ID]},re=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={isSignedIn:!1},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.unregisterAuthObserver=p.auth().onAuthStateChanged(function(t){return e.setState({isSignedIn:!!t})})}},{key:"render",value:function(){return this.state.isSignedIn?i.a.createElement("div",null,i.a.createElement(m,null,i.a.createElement(D.a,{variant:"outlined",color:"primary",onClick:function(){return p.auth().signOut()}},"Sign Out")),"lowzxx@gmail.com"===(e=p.auth().currentUser.email)||"nelsontkyi@gmail.com"===e?i.a.createElement(ne,{currentUser:p.auth().currentUser}):i.a.createElement(ae,{currentUser:p.auth().currentUser})):i.a.createElement(m,null,i.a.createElement("h1",null,"Submit to Let It Go"),i.a.createElement("p",null,"Please sign-in:"),i.a.createElement(se.a,{uiConfig:oe,firebaseAuth:p.auth()}),i.a.createElement(f,null));var e}}]),t}(i.a.Component),le=a(82),ce=a.n(le),ue=a(83),de=a.n(ue),me=a(84),he=new ce.a(de.a);he.injectStyles(),Object(me.a)(he),o.a.render(i.a.createElement(re,null),document.getElementById("root"))},95:function(e,t,a){e.exports=a(129)}},[[95,1,2]]]);
//# sourceMappingURL=main.9c7af302.chunk.js.map