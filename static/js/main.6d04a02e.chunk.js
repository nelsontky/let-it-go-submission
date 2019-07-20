(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{131:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(11),r=a.n(i),o=a(13),l=a(9),c=a(15),u=a(14),d=a(16),m=function(e){var t=e.children;return s.a.createElement("div",{style:{margin:"3rem auto",maxWidth:650,padding:"0 1rem"}},t)},h=a(68);a(104),a(71),a(132);h.initializeApp({apiKey:"AIzaSyCmdA27Yq_H79ugY2uCSzNNZV_JuzBxh0Q",authDomain:"let-it-go-e6229.firebaseapp.com",databaseURL:"https://let-it-go-e6229.firebaseio.com",projectId:"let-it-go-e6229",storageBucket:"let-it-go-e6229.appspot.com",messagingSenderId:"917575844853",appId:"1:917575844853:web:88ec0cbe059a0d43"});var p=h,b={color:"gray",fontFamily:"Georgia, serif",fontSize:"1.5em",fontStyle:"italic",lineHeight:"1.4",margin:"0",textShadow:"0 1px white",zIndex:"600",textAlign:"center"},g=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={},a.unmounted=!1,a.db=p.firestore(),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.db.collection("toiletQuotes").doc("quotes").get().then(function(t){var a=t.data().quotes,n=a[Math.floor(Math.random()*a.length)];e.unmounted||e.setState({quote:"\u201c"+n+"\u201d"})}).catch(function(){return e.setState({quote:"\u201cFeces are meant to be released in peace.\u201d"})})}},{key:"componentWillUnmount",value:function(){this.unmounted=!0}},{key:"render",value:function(){return s.a.createElement("p",{style:b},this.state.quote)}}]),t}(s.a.Component),f=a(39),v=a(20),E=function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.viewer=window.pannellum.viewer("panorama",{type:"equirectangular",panorama:this.props.url,vaov:45,maxPitch:0,minPitch:0,autoLoad:!0})}},{key:"componentWillUnmount",value:function(){this.viewer.destroy()}},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("div",{id:"panorama",style:{width:"100%",height:200}}))}}]),t}(s.a.Component),w=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).submission=a.props.submission,a.staticMapUrl="https://maps.googleapis.com/maps/api/staticmap?size=650x300&markers=|".concat(a.submission.lat,", ").concat(a.submission.lon,"&key=").concat("AIzaSyCmdA27Yq_H79ugY2uCSzNNZV_JuzBxh0Q"),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"handicappedText",value:function(){return this.submission.facilities.handicapped?this.submission.facilities.separateHandicapped?"Is handicapped accessible (Has separate handicapped toilet)":"Is handicapped accessible (Handicapped cubicle inside toilet)":"Is handicapped accessible"}},{key:"glanceStyle",value:function(e){return{textDecoration:e?"":"line-through",color:e?"":"gray"}}},{key:"render",value:function(){return s.a.createElement(m,null,s.a.createElement("h3",null,this.submission.name),s.a.createElement("img",{src:this.staticMapUrl,alt:"Static map preview"}),s.a.createElement(E,{url:this.submission.panorama.url}),s.a.createElement("h4",null,"At a glance"),s.a.createElement("ul",{style:{listStyle:"none"}},s.a.createElement("li",{style:this.glanceStyle(this.submission.facilities.male)},s.a.createElement("i",{className:"em-svg em-man-raising-hand"}),"Has Male toilet"),s.a.createElement("li",{style:this.glanceStyle(this.submission.facilities.female)},s.a.createElement("i",{className:"em-svg em-woman-raising-hand"}),"Has Female toilet"),s.a.createElement("li",{style:this.glanceStyle(this.submission.facilities.handicapped)},s.a.createElement("i",{className:"em-svg em-wheelchair"}),this.handicappedText()),s.a.createElement("li",{style:this.glanceStyle(this.submission.facilities.waterCooler)},s.a.createElement("i",{className:"em-svg em-potable_water"}),"Has water cooler"),s.a.createElement("li",{style:this.glanceStyle(this.submission.facilities.showerHeads)},s.a.createElement("i",{className:"em-svg em-shower"}),"Has shower heads"),s.a.createElement("li",{style:this.glanceStyle(this.submission.facilities.hose)},s.a.createElement("i",{className:"em-svg em-sweat_drops"}),"Has hose")))}}]),t}(s.a.Component),y=a(167),k=a(170),S=a(165),C=a(185),j=function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return s.a.createElement(S.a,null,s.a.createElement(y.a,null,"Sort by"),s.a.createElement(C.a,{value:this.props.value,autoWidth:!0,onChange:this.props.handleSorting},s.a.createElement(k.a,{value:"name"},"Name"),s.a.createElement(k.a,{value:"date"},"Date (Newest first)"),s.a.createElement(k.a,{value:"status"},"Status")))}}]),t}(s.a.Component),O=a(180),H=a(182),I=a(172),D=a(181),L=a(171),A=a(169),R=a(174),U=a(134),M=a(173),x=a(59),T=a(187),P=a(175),N=a(189),F=a(176),W=a(177),z=a(178),B=a(179),_=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).submissionsDb=p.firestore().collection("userSubmissions"),a.toiletDb=p.firestore().collection("toilets"),a.reviewsDb=p.firestore().collection("reviews"),a.storage=p.storage(),a.handleSorting=a.handleSorting.bind(Object(v.a)(a)),a.state={submissions:[],submissionToReject:{},submissionToApprove:{},remarks:"",previewRow:null,sortBy:"date",showAcceptedReviews:!1},a.getAllSubmissions(),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"getAllSubmissions",value:function(){var e=this,t=[],a=new Map;this.submissionsDb.get().then(function(n){n.forEach(function(n){var s=n.data().currentUser.uid;console.log(n.data().currentUser),e.submissionsDb.doc(s).collection("submissions").onSnapshot(function(i){i.forEach(function(e){var i={userUid:s,currentUser:n.data().currentUser,userPhoto:n.data().currentUser.photoURL,docId:e.id,date:e.data().date,isFemale:e.data().facilities.female,isMale:e.data().facilities.male,isHandicapped:e.data().facilities.handicapped,isSeparateHandicapped:e.data().facilities.separateHandicapped,hasHose:e.data().facilities.hose,hasShowerHeads:e.data().facilities.showerHeads,hasWaterCooler:e.data().facilities.waterCooler,lat:e.data().lat,lon:e.data().lon,name:e.data().name,paranomaUrl:e.data().panorama.url,panoramaFileName:e.data().panorama.fileName,status:e.data().status.approval,remarks:e.data().status.remarks};a.has(i.docId)||(a.set(i.docId,!0),t.push(i))}),i.docChanges().forEach(function(e){var a=e.doc.id,n=t.find(function(e){return e.docId===a}),i=n.rowId;t[i]={userUid:s,docId:n.id,date:e.doc.data().date,isFemale:e.doc.data().facilities.female,isMale:e.doc.data().facilities.male,isHandicapped:e.doc.data().facilities.handicapped,isSeparateHandicapped:e.doc.data().facilities.separateHandicapped,hasHose:e.doc.data().facilities.hose,hasShowerHeads:e.doc.data().facilities.showerHeads,hasWaterCooler:e.doc.data().facilities.waterCooler,lat:e.doc.data().lat,lon:e.doc.data().lon,name:e.doc.data().name,paranomaUrl:e.doc.data().panorama.url,status:e.doc.data().status.approval,remarks:e.doc.data().status.remarks}});var r=-1;t.map(function(e){return r++,e.rowId=r,e}),t.sort(G),e.setState({submissions:t})})})})}},{key:"generateFacilities",value:function(e){return s.a.createElement("div",{style:{textAlign:"center"}},e.isMale&&s.a.createElement("i",{className:"em-svg em-man-raising-hand"}),e.isFemale&&s.a.createElement("i",{className:"em-svg em-woman-raising-hand"}),e.hasWaterCooler&&s.a.createElement("i",{className:"em-svg em-potable_water"})," ",e.hasShowerHeads&&s.a.createElement("i",{className:"em-svg em-shower"})," ",e.hasHose&&s.a.createElement("i",{className:"em-svg em-sweat_drops"})," ",e.isHandicapped&&s.a.createElement("i",{className:"em-svg em-wheelchair"}))}},{key:"submissionAction",value:function(e){var t=this;return s.a.createElement(S.a,null,s.a.createElement(C.a,{value:[10,20,30],onChange:function(a){var n=t.state.submissions[e];switch(a.target.value){case"Approve":t.triggerDialogToConfirmApprove(n,e);break;case"Reject":t.handleRejectSubmissionClicked(n,e)}}},s.a.createElement(k.a,{value:"Approve"},"Approve"),s.a.createElement(k.a,{value:"Reject"},"Reject")))}},{key:"triggerDialogToConfirmApprove",value:function(e,t){this.setState({submissionToApprove:e,submissionIndex:t,approveDialogOpened:!0})}},{key:"approveSubmission",value:function(){var e=this,t=this.state.remarks[this.state.submissionIndex],a=this.state.submissionToApprove;this.submissionsDb.doc(this.state.submissionToApprove.userUid).collection("submissions").doc(this.state.submissionToApprove.docId).update({status:{approval:"approved",remarks:null==t?"":t}}),this.storage.refFromURL(a.paranomaUrl).getDownloadURL().then(function(t){var n=new XMLHttpRequest;n.responseType="blob",n.onload=function(t){var s=n.response,i=e.storage.ref().child("approved/".concat(a.panoramaFileName)).put(s);i.on("state_changed",null,function(e){return console.log(e)},function(){i.snapshot.ref.getDownloadURL().then(function(t){e.toiletDb.doc(a.name).set({facilities:{female:a.isFemale,handicapped:a.isHandicapped,hose:a.hasHose,male:a.isMale,separateHandicapped:a.isSeparateHandicapped,showerHeads:a.hasShowerHeads,waterCooler:a.hasWaterCooler},lat:a.lat,lon:a.lon,name:a.name,paranomaUrl:t}).then(function(){e.setState({approveDialogOpened:!1})}),e.reviewsDb.doc(a.name).set({})})})},n.open("GET",t),n.send()})}},{key:"handleRejectSubmissionClicked",value:function(e,t){this.setState({rejectDialogOpened:!0,submissionToReject:e,submissionIndex:t})}},{key:"rejectSubmission",value:function(){var e=this,t=this.state.remarks[this.state.submissionIndex];this.submissionsDb.doc(this.state.submissionToReject.userUid).collection("submissions").doc(this.state.submissionToReject.docId).update({status:{approval:"rejected",remarks:t||this.state.submissionToReject.remarks}}).then(function(){e.setState({rejectDialogOpened:!1})})}},{key:"handleTextChange",value:function(e,t){this.setState({remarks:Object(f.a)({},t,e.target.value)})}},{key:"generateTable",value:function(){var e=this;return this.state.submissions.filter(function(t){return e.state.showAcceptedReviews?t:"pending"===t.status||"rejected"===t.status}).map(function(t,a){return s.a.createElement(s.a.Fragment,{key:a},s.a.createElement(L.a,null,s.a.createElement(I.a,{style:{whiteSpace:"normal",wordWrap:"break-word"}},s.a.createElement(U.a,{style:{justifyContent:"center",textAlign:"center",flexDirection:"column",margin:0,padding:0}},s.a.createElement(M.a,{src:t.userPhoto}),s.a.createElement(x.a,{variant:"body1",noWrap:!0,style:{fontSize:15,maxWidth:120}},s.a.createElement("b",null,t.currentUser.name)))),s.a.createElement(I.a,null,t.name+" ",t.rowId!==e.state.previewRow?s.a.createElement(R.a,{onClick:function(){return e.setState({previewRow:t.rowId})},color:"primary"},"Preview"):s.a.createElement(R.a,{onClick:function(){return e.setState({previewRow:null})},color:"secondary"},"Hide")),s.a.createElement(I.a,null,t.date.toDate().toLocaleString("default",{day:"numeric",month:"long",year:"numeric",hour:"numeric",minute:"numeric"})),s.a.createElement(I.a,null,e.generateFacilities(t)),s.a.createElement(I.a,{size:"small"},s.a.createElement(T.a,{multiline:!0,defaultValue:t.remarks,fullWidth:!0,margin:"dense",inputProps:{style:{fontSize:15}},onChange:function(a){e.handleTextChange(a,t.rowId)}})),s.a.createElement(I.a,null,null==t.status?"Pending":t.status," "),s.a.createElement(I.a,null,e.submissionAction(t.rowId))),e.state.previewRow===t.rowId&&s.a.createElement(L.a,null,s.a.createElement(I.a,{colSpan:7},s.a.createElement(w,{submission:Object.assign({panorama:{url:t.paranomaUrl},facilities:{hose:t.hasHose,showerHeads:t.hasShowerHeads,waterCooler:t.hasWaterCooler,male:t.isMale,separateHandicapped:t.isSeparateHandicapped,handicapped:t.isHandicapped,female:t.isFemale}},t)}))))})}},{key:"handleSorting",value:function(e){var t=this.state.submissions.slice();switch(e.target.value){case"name":t.sort(q);break;case"date":t.sort(G);break;case"status":t.sort(J)}this.setState({submissions:t,sortBy:e.target.value})}},{key:"render",value:function(){var e=this;return s.a.createElement(P.a,{style:{padding:0,textAlign:"center"}},s.a.createElement(R.a,{variant:"contained",color:"primary",onClick:function(){return e.setState({showAcceptedReviews:!e.state.showAcceptedReviews})}},(this.state.showAcceptedReviews?"Hide ":"Show ")+"Accepted Reviews"),s.a.createElement(A.a,{style:{margin:20}},s.a.createElement(N.a,{onClose:function(){e.setState({approveDialogOpened:!1})},open:this.state.approveDialogOpened},s.a.createElement(F.a,null,"Are you sure?"),s.a.createElement(W.a,null,s.a.createElement(z.a,null,"Do you really want to approve "+this.state.submissionToApprove.name+" with the remarks "+(this.state.remarks[this.state.submissionIndex]?this.state.remarks[this.state.submissionIndex]:this.state.submissionToApprove.remarks)+"?")),s.a.createElement(B.a,null,s.a.createElement(R.a,{onClick:function(){return e.approveSubmission()}},"Approve"),s.a.createElement(R.a,{onClick:function(){e.setState({approveDialogOpened:!1})}},"Cancel"))),s.a.createElement(N.a,{onClose:function(){e.setState({rejectDialogOpened:!1})},open:this.state.rejectDialogOpened},s.a.createElement(F.a,null,"Are you sure?"),s.a.createElement(W.a,null,s.a.createElement(z.a,null,"Do you really want to reject "+this.state.submissionToReject.name+" with the remarks "+(this.state.remarks[this.state.submissionIndex]?this.state.remarks[this.state.submissionIndex]:this.state.submissionToReject.remarks)+"?")),s.a.createElement(B.a,null,s.a.createElement(R.a,{onClick:function(){return e.rejectSubmission()}},"Reject"),s.a.createElement(R.a,{onClick:function(){e.setState({rejectDialogOpened:!1})}},"Cancel"))),s.a.createElement(j,{value:this.state.sortBy,handleSorting:this.handleSorting}),s.a.createElement(O.a,{style:{minWidth:650}},s.a.createElement(D.a,null,s.a.createElement(L.a,null,s.a.createElement(I.a,null,"User"),s.a.createElement(I.a,null,"Name"),s.a.createElement(I.a,null,"Submission Date"),s.a.createElement(I.a,null,"Facilities"),s.a.createElement(I.a,null,"Remarks "),s.a.createElement(I.a,null,"Status"),s.a.createElement(I.a,null,"Action"))),s.a.createElement(H.a,null,this.generateTable()))))}}]),t}(s.a.Component);function q(e,t){return e.name.localeCompare(t.name)}function G(e,t){return t.date.toDate()-e.date.toDate()}function J(e,t){var a,n;switch(e.status){case"rejected":a=-1;break;case"approved":a=0;break;default:a=1}switch(t.status){case"rejected":n=-1;break;case"approved":n=0;break;default:n=1}return a-n}var Y=function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"watchLocation",value:function(){var e=this;navigator.geolocation?this.id=navigator.geolocation.watchPosition(function(t){var a=t.coords.latitude,n=t.coords.longitude;e.props.updateMyLocation(a,n),e.myLocation.setPosition({lat:a,lng:n}),e.accuracyRadius.setCenter({lat:a,lng:n}),e.accuracyRadius.setRadius(t.coords.accuracy)},function(){return console.log("No permission")},{enableHighAccuracy:!0}):console.log("No permission")}},{key:"componentDidMount",value:function(){var e=this,t={lat:1.296675,lng:103.776396};this.map=new window.google.maps.Map(document.getElementById("map"),{zoom:13,center:t}),this.myLocation=new window.google.maps.Marker({position:t,map:this.map,icon:"https://raw.githubusercontent.com/nelsontky/let-it-go/master/assets/icons/locationMarker.png"}),this.accuracyRadius=new window.google.maps.Circle({map:this.map,center:t,radius:0,fillColor:"#00F",fillOpacity:.2,strokeWeight:0}),this.map.addListener("click",function(t){e.props.handleMapClick(t.latLng.lat(),t.latLng.lng()),null!=e.marker&&e.marker.setMap(null),e.marker=new window.google.maps.Marker({position:t.latLng,map:e.map})}),this.accuracyRadius.addListener("click",function(t){e.props.handleMapClick(t.latLng.lat(),t.latLng.lng()),null!=e.marker&&e.marker.setMap(null),e.marker=new window.google.maps.Marker({position:t.latLng,map:e.map})}),this.myLocation.addListener("click",function(){e.props.handleMapClick(e.myLocation.getPosition().lat(),e.myLocation.getPosition().lng()),null!=e.marker&&e.marker.setMap(null),e.marker=new window.google.maps.Marker({position:e.myLocation.getPosition(),map:e.map})});var a=this;var n=document.createElement("div");new function(e,t){var n=document.createElement("div");n.style.backgroundColor="#fff",n.style.border="2px solid #fff",n.style.borderRadius="3px",n.style.boxShadow="0 2px 6px rgba(0,0,0,.3)",n.style.cursor="pointer",n.style.textAlign="center",n.style.marginBottom="22px",n.style.height="31px",n.title="Click to recenter the map to location",e.appendChild(n);var s=document.createElement("div");s.innerHTML="<img src='https://i.imgur.com/raFRca2.png' />",n.appendChild(s),n.addEventListener("click",function(){t.setCenter(a.myLocation.getPosition())})}(n,this.map),n.index=1,this.map.controls[window.google.maps.ControlPosition.LEFT_BOTTOM].push(n),this.watchLocation()}},{key:"componentWillUnmount",value:function(){navigator.geolocation.clearWatch(this.id)}},{key:"render",value:function(){return s.a.createElement("div",{id:"map",style:{width:"100%",height:"300px"}})}}]),t}(s.a.Component),V=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={remarksShown:!1},a.approval=a.props.status.approval,a.remarks=a.props.status.remarks,a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return"rejected"===this.approval?s.a.createElement("div",null,s.a.createElement("p",{style:{color:"red"}},"Rejected ",s.a.createElement(R.a,{color:"primary",onClick:function(){return e.setState({remarksShown:!e.state.remarksShown})}},this.state.remarksShown?"Hide":"Show reason")),this.state.remarksShown&&s.a.createElement("p",null,this.remarks)):"pending"===this.approval?s.a.createElement("p",null,s.a.createElement("em",null,"Submission pending review")):s.a.createElement("p",{style:{color:"green"}},"Approved!")}}]),t}(s.a.Component),Q=a(79),Z=a.n(Q);function K(e,t){return e.submission.name.localeCompare(t.submission.name)}function X(e,t){return t.submission.date.toDate()-e.submission.date.toDate()}function $(e,t){var a,n;switch(e.submission.status.approval){case"rejected":a=-1;break;case"approved":a=0;break;default:a=1}switch(t.submission.status.approval){case"rejected":n=-1;break;case"approved":n=0;break;default:n=1}return a-n}var ee=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).submission=a.props.children.submission,a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("div",null,s.a.createElement("h4",null,this.submission.name),s.a.createElement(V,{status:this.submission.status}),s.a.createElement("div",null,s.a.createElement(R.a,{variant:"contained",color:this.props.children.id===this.props.previewId?"secondary":"default",onClick:this.props.children.id===this.props.previewId?this.props.handleHide:function(){return e.props.handlePreview(e.props.children.id)}},this.props.children.id===this.props.previewId?"Hide":"Preview")," ",s.a.createElement(R.a,{variant:"contained",color:"primary",disabled:"approved"===this.submission.status.approval,onClick:function(){return e.props.handleEdit(e.submission,e.props.children.id)}},"Edit")," ",s.a.createElement(R.a,{variant:"contained",color:"secondary",onClick:function(){return e.props.handleDelete(e.submission.panorama.fileName,e.props.children.id)}},"Delete",s.a.createElement(Z.a,null))),s.a.createElement("br",null),s.a.createElement("div",{style:{color:"gray",fontSize:"80%"}},"Submitted:"," ",this.submission.date.toDate().toLocaleString("default",{day:"numeric",month:"long",year:"numeric",hour:"numeric",minute:"numeric"})),s.a.createElement("br",null),this.props.children.id===this.props.previewId&&s.a.createElement(w,{submission:this.submission}))}}]),t}(s.a.Component),te=function(e){function t(e){var a;Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={submissions:[],previewId:"",loading:!0,sortBy:"status"};var n=[];return a.props.doc.collection("submissions").get().then(function(e){return e.forEach(function(e){n.push({submission:e.data(),id:e.id})})}).then(function(){n.sort($),a.setState({submissions:n,loading:!1})}),a.handlePreview=a.handlePreview.bind(Object(v.a)(a)),a.handleHide=a.handleHide.bind(Object(v.a)(a)),a.handleSorting=a.handleSorting.bind(Object(v.a)(a)),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"handlePreview",value:function(e){this.setState({previewId:e})}},{key:"handleHide",value:function(){this.setState({previewId:""})}},{key:"handleSorting",value:function(e){var t=this.state.submissions.slice();switch(e.target.value){case"name":t.sort(K);break;case"date":t.sort(X);break;case"status":t.sort($)}this.setState({submissions:t,sortBy:e.target.value})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",null,this.state.loading&&s.a.createElement("span",null,"Loading... ..."),!this.state.loading&&0===this.state.submissions.length&&s.a.createElement("span",null,"You have not created any submissions (yet!)"),!this.state.loading&&0!==this.state.submissions.length&&s.a.createElement("div",null,s.a.createElement("br",null),s.a.createElement(j,{key:this.state.sortBy,value:this.state.sortBy,handleSorting:this.handleSorting}),s.a.createElement(O.a,null,s.a.createElement(H.a,null,this.state.submissions.map(function(t,a){return s.a.createElement(L.a,{key:a},s.a.createElement(I.a,null,s.a.createElement(ee,{key:e.state.sortBy,handleEdit:e.props.handleEdit,handleDelete:e.props.handleDelete,handlePreview:e.handlePreview,handleHide:e.handleHide,previewId:e.state.previewId},t)))})))))}}]),t}(s.a.Component),ae=a(80),ne=a.n(ae),se=a(186),ie=a(184),re=a(133),oe=a(183),le=a(123),ce=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={name:"",lat:0,lon:0,myLat:0,myLon:0,handicapped:!1,separateHandicapped:!1,hose:!1,showerHeads:!1,male:!1,female:!1,waterCooler:!1,progress:0,progressShown:!1,error:!1,submissionsShown:!1,edit:!1,panorama:{},editPanorama:!1,editDocId:""},a.fileInput=s.a.createRef(),a.db=p.firestore(),a.storage=p.storage(),a.doc=a.db.collection("userSubmissions").doc(a.props.currentUser.uid),a.handleInputChange=a.handleInputChange.bind(Object(v.a)(a)),a.handleMapClick=a.handleMapClick.bind(Object(v.a)(a)),a.updateMyLocation=a.updateMyLocation.bind(Object(v.a)(a)),a.setToCurrentLocation=a.setToCurrentLocation.bind(Object(v.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(v.a)(a)),a.handleEdit=a.handleEdit.bind(Object(v.a)(a)),a.handleDelete=a.handleDelete.bind(Object(v.a)(a)),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"handleInputChange",value:function(e){var t,a="checkbox"===e.target.type?e.target.checked:e.target.value;"handicapped"!==e.target.name?this.setState(Object(f.a)({},e.target.name,a)):this.setState((t={},Object(f.a)(t,e.target.name,a),Object(f.a)(t,"separateHandicapped",a&&this.state.separateHandicapped),t))}},{key:"handleMapClick",value:function(e,t){this.setState({lat:e,lon:t})}},{key:"updateMyLocation",value:function(e,t){this.setState({myLat:e,myLon:t})}},{key:"setToCurrentLocation",value:function(e){e.preventDefault(),this.setState({lat:this.state.myLat,lon:this.state.myLon})}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault(),this.state.edit&&!this.state.editPanorama?this.doc.collection("submissions").doc().set({facilities:{female:this.state.female,handicapped:this.state.handicapped,hose:this.state.hose,male:this.state.male,separateHandicapped:this.state.separateHandicapped,showerHeads:this.state.showerHeads,waterCooler:this.state.waterCooler},lat:this.state.lat,lon:this.state.lon,name:this.state.name.trim(),panorama:this.state.panorama,date:new Date(Date.now()),status:{approval:"pending",remarks:""}}).then(function(){t.doc.collection("submissions").doc(t.state.editDocId).delete()}).then(function(){return window.location.reload()}):null!=this.fileInput.current.files[0]&&/image\/*/g.test(this.fileInput.current.files[0].type)?ne.a.imageFileResizer(this.fileInput.current.files[0],4096,4096,"JPEG",70,0,function(e){t.setState({progressShown:!0});var a="".concat(t.state.name," - ").concat(le(),".jpeg"),n=t.storage.ref().child("".concat(t.props.currentUser.uid,"/").concat(a)).put(e);n.on(p.storage.TaskEvent.STATE_CHANGED,function(e){var a=e.bytesTransferred/e.totalBytes*100;t.setState({progress:a})},function(e){t.setState({error:!0})},function(){n.snapshot.ref.getDownloadURL().then(function(e){t.doc.set({currentUser:{name:t.props.currentUser.displayName,photoURL:t.props.currentUser.photoURL,uid:t.props.currentUser.uid}}),t.doc.collection("submissions").doc().set({facilities:{female:t.state.female,handicapped:t.state.handicapped,hose:t.state.hose,male:t.state.male,separateHandicapped:t.state.separateHandicapped,showerHeads:t.state.showerHeads,waterCooler:t.state.waterCooler},lat:t.state.lat,lon:t.state.lon,name:t.state.name.trim(),panorama:{url:e,fileName:a},date:new Date(Date.now()),status:{approval:"pending",remarks:""}}).then(function(){t.state.edit&&(t.doc.collection("submissions").doc(t.state.editDocId).delete(),t.storage.ref().child("".concat(t.props.currentUser.uid,"/").concat(t.state.panorama.fileName)).delete())}).then(function(){return window.location.reload()})})})},"blob"):alert("Please make sure file uploaded is an image")}},{key:"handleDelete",value:function(e,t){var a=this;window.confirm("Are you sure you want to delete this submission?")&&this.doc.collection("submissions").doc(t).delete().then(function(){return a.storage.ref().child("".concat(a.props.currentUser.uid,"/").concat(e)).delete().then(function(){return window.location.reload()})})}},{key:"handleEdit",value:function(e,t){window.scrollTo(0,0),this.setState({edit:!0,female:e.facilities.female,male:e.facilities.male,handicapped:e.facilities.handicapped,separateHandicapped:e.facilities.separateHandicapped,showerHeads:e.facilities.showerHeads,waterCooler:e.facilities.waterCooler,hose:e.facilities.hose,lat:e.lat,lon:e.lon,name:e.name,panorama:e.panorama,editDocId:t})}},{key:"render",value:function(){var e=this;return s.a.createElement(m,null,s.a.createElement("h1",null,"Submit to Let It Go"),this.state.edit&&s.a.createElement("h6",null,"Editing submission"),s.a.createElement("form",{onSubmit:this.handleSubmit},s.a.createElement(T.a,{label:"Name",placeholder:"Enter toilet name",fullWidth:!0,margin:"normal",variant:"outlined",InputLabelProps:{shrink:!0},name:"name",onChange:this.handleInputChange,value:this.state.name}),s.a.createElement(R.a,{onClick:this.setToCurrentLocation,variant:"contained"},"Set Lat Lon to current location"),s.a.createElement("br",null),s.a.createElement(T.a,{style:{marginRight:"1em"},label:"Latitude",margin:"normal",variant:"outlined",name:"lat",onChange:this.handleInputChange,value:this.state.lat}),s.a.createElement(T.a,{label:"Longitude",margin:"normal",variant:"outlined",name:"lon",onChange:this.handleInputChange,value:this.state.lon}),s.a.createElement(Y,{handleMapClick:this.handleMapClick,updateMyLocation:this.updateMyLocation}),s.a.createElement("br",null),s.a.createElement(re.a,{component:"legend"},"Facilities"),s.a.createElement(oe.a,null,s.a.createElement(ie.a,{control:s.a.createElement(se.a,{checked:this.state.male,onChange:this.handleInputChange,name:"male"}),label:"Male"}),s.a.createElement(ie.a,{control:s.a.createElement(se.a,{checked:this.state.female,onChange:this.handleInputChange,name:"female"}),label:"Female"}),s.a.createElement(ie.a,{control:s.a.createElement(se.a,{checked:this.state.handicapped,onChange:this.handleInputChange,name:"handicapped"}),label:"Handicapped"}),s.a.createElement(ie.a,{control:s.a.createElement(se.a,{checked:this.state.separateHandicapped,onChange:this.handleInputChange,name:"separateHandicapped",disabled:!this.state.handicapped}),label:"Separate Handicapped"}),s.a.createElement(ie.a,{control:s.a.createElement(se.a,{checked:this.state.hose,onChange:this.handleInputChange,name:"hose"}),label:"Hose"}),s.a.createElement(ie.a,{control:s.a.createElement(se.a,{checked:this.state.showerHeads,onChange:this.handleInputChange,name:"showerHeads"}),label:"Shower Heads"}),s.a.createElement(ie.a,{control:s.a.createElement(se.a,{checked:this.state.waterCooler,onChange:this.handleInputChange,name:"waterCooler"}),label:"Water Cooler"})),s.a.createElement("br",null),this.state.edit&&s.a.createElement("div",null,s.a.createElement(ie.a,{control:s.a.createElement(se.a,{checked:this.state.editPanorama,onChange:this.handleInputChange,name:"editPanorama"}),label:"Edit Panorama image"}),s.a.createElement("br",null)),s.a.createElement("input",{type:"file",name:"paranomaPath",accept:"image/*",ref:this.fileInput,id:"contained-button-file",style:{display:"none"}}),(!this.state.edit||this.state.editPanorama)&&s.a.createElement("label",{htmlFor:"contained-button-file"},s.a.createElement(R.a,{variant:"contained",component:"span"},"Select panorama image")),s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement(R.a,{variant:"contained",color:"primary",type:"submit",disabled:""===this.state.name||0===this.state.lat||0===this.state.lon},"Submit"),s.a.createElement("span",null,this.state.progressShown&&" "+Math.floor(this.state.progress)+"%"),s.a.createElement("p",null,this.state.error&&"An error occured, please refresh the page and try again"),this.state.edit&&s.a.createElement(R.a,{variant:"contained",color:"secondary",onClick:function(){return window.location.reload()}},"Cancel")),s.a.createElement(R.a,{color:"secondary",onClick:function(){return e.setState({submissionsShown:!e.state.submissionsShown})}},"".concat(this.state.submissionsShown?"Hide":"Show"," your submissions")),this.state.submissionsShown&&s.a.createElement(te,{uid:this.props.currentUser.uid,doc:this.doc,handleEdit:this.handleEdit,handleDelete:this.handleDelete}))}}]),t}(s.a.Component),ue=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={isAdmin:!0},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("div",null,s.a.createElement("div",{style:{textAlign:"center"}},s.a.createElement(R.a,{onClick:function(){return e.setState({isAdmin:!e.state.isAdmin})},variant:"contained",color:"secondary"},"Switch to ".concat(this.state.isAdmin?"submission":"admin"," portal"))),this.state.isAdmin?s.a.createElement(_,null):s.a.createElement(ce,{currentUser:this.props.currentUser}))}}]),t}(s.a.Component),de=a(81),me=a.n(de);var he={signInOptions:[p.auth.GoogleAuthProvider.PROVIDER_ID]},pe=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={isSignedIn:!1},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.unregisterAuthObserver=p.auth().onAuthStateChanged(function(t){return e.setState({isSignedIn:!!t})})}},{key:"render",value:function(){return this.state.isSignedIn?s.a.createElement("div",null,s.a.createElement(m,null,s.a.createElement(R.a,{variant:"outlined",color:"primary",onClick:function(){return p.auth().signOut()}},"Sign Out")),"lowzxx@gmail.com"===(e=p.auth().currentUser.email)||"nelsontkyi@gmail.com"===e?s.a.createElement(ue,{currentUser:p.auth().currentUser}):s.a.createElement(ce,{currentUser:p.auth().currentUser})):s.a.createElement(m,null,s.a.createElement("h1",null,"Submit to Let It Go"),s.a.createElement("p",null,"Please sign-in:"),s.a.createElement(me.a,{uiConfig:he,firebaseAuth:p.auth()}),s.a.createElement(g,null));var e}}]),t}(s.a.Component),be=a(82),ge=a.n(be),fe=a(83),ve=a.n(fe),Ee=a(84),we=new ge.a(ve.a);we.injectStyles(),Object(Ee.a)(we),r.a.render(s.a.createElement(pe,null),document.getElementById("root"))},97:function(e,t,a){e.exports=a(131)}},[[97,1,2]]]);
//# sourceMappingURL=main.6d04a02e.chunk.js.map