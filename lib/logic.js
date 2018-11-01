/**
  * @param {org.example.archive.Demo} demo
  * @transaction 
  */
 async function demo(demo) {
  console.log('demo');

  const factory = getFactory();
  const namespace = 'org.example.archive';

  //let secretaries = ['AliceTsao'];
  
  let secretaryModel = {
    'AliceTsao' : {
      "name": "美青",
    "lastName": "鄒"
    }
  }

  let secretaries = Object.keys(secretaryModel).map(function (key) {
      console.log({key});
      const secretaryResource = factory.newResource(namespace, 'Secretary', key);
      const secretary = secretaryModel[key];
      secretaryResource.name = secretary.name;
      secretaryResource.lastName = secretary.lastName;
      return secretaryResource;
  });
  const secretaryRegistry = await getParticipantRegistry(namespace + '.Secretary');
  await secretaryRegistry.addAll(secretaries);
   
  let querentModel = {
    'JohnChen' : {
      "name": "強",
      "lastName": "陳"
    }
  }

  let querents = Object.keys(querentModel).map(function (key) {
      console.log({key});
      const querentResource = factory.newResource(namespace, 'Querent', key);
      const querent = querentModel[key];
      querentResource.name = querent.name;
      querentResource.lastName = querent.lastName;
      return querentResource;
  });
  const querentRegistry = await getParticipantRegistry(namespace + '.Querent');
  await querentRegistry.addAll(querents);
   
  
  let odModel = [
    {
  "Issue_No": "桃稅蘆1064413137",
  "Issue_Date": "1070105",
  "Class_Type": "A",
  "Send_Class_ID": "H42210601333",
  "Duty_Name": "王小明　　　遺產管理人：財政部國有財產署北區分署",
  "Duty_Birthday": "0691119",
  "Duty_ZipCode": "100",
  "Duty_Addr": "臺北市大安區羅斯福路四段一號",
  "Legal_Case_ID": "0101",
  "Pay_Amt": 3183,
  "Protect_Exit_Org": true,
  "Protect_Punish_Org": false,
  "Protect_Guar_Org": false,
  "Protect_Sei_Org": false,
  "Protect_Closed_Org": false,
  "Pay_Period_Due_Date": "1081113",
  "Is_Punishment": true,
  "End_File_No": "",
  "End_File_Date": "",
  "BatchNo": "",
  "BatchYear": "",
  "End_Print_Date": "",
  "End_Valid_Date": "",
  "Agency_Id": "TP",
  "Transfer_Agency_Id": "103001",
  "Transfer_Date": "1071024"
    },
    {
      "Issue_No": "桃稅法1063702754",
  "Issue_Date": "1080205",
  "Class_Type": "B",
  "Send_Class_ID": "H42210601334",
  "Duty_Name": "林○惠　　　遺產管理人：財政部國有財產署北區分署",
  "Duty_Birthday": "0450213",
  "Duty_ZipCode": "101",
  "Duty_Addr": "臺北市中正區濟南路 1 段 2 之 2 號 6 樓",
  "Legal_Case_ID": "0208",
  "Pay_Amt": 1197,
  "Protect_Exit_Org": false,
  "Protect_Punish_Org": false,
  "Protect_Guar_Org": false,
  "Protect_Sei_Org": false,
  "Protect_Closed_Org": false,
  "Pay_Period_Due_Date": "1091231",
  "Is_Punishment": false,
  "End_File_No": "",
  "End_File_Date": "",
  "BatchNo": "",
  "BatchYear": "",
  "End_Print_Date": "",
  "End_Valid_Date": "",
  "Agency_Id": "TC",
  "Transfer_Agency_Id": "103002",
  "Transfer_Date": "1071023"
    },
    {
      "Issue_No": "桃稅蘆1064413368",
  "Issue_Date": "1070206",
  "Class_Type": "C",
  "Send_Class_ID": "H4221060133",
  "Duty_Name": "陳○天　　遺產管理人：財政部國有財產署北區分署",
  "Duty_Birthday": "0700618",
  "Duty_ZipCode": "22164",
  "Duty_Addr": "台北市中正區忠孝東路 1 段 1 號",
  "Legal_Case_ID": "0413",
  "Pay_Amt": 12420,
  "Protect_Exit_Org": false,
  "Protect_Punish_Org": false,
  "Protect_Guar_Org": true,
  "Protect_Sei_Org": false,
  "Protect_Closed_Org": false,
  "Pay_Period_Due_Date": "1070821",
  "Is_Punishment": true,
  "End_File_No": "",
  "End_File_Date": "",
  "BatchNo": "",
  "BatchYear": "",
  "End_Print_Date": "",
  "End_Valid_Date": "",
  "Agency_Id": "SC",
  "Transfer_Agency_Id": "103003",
  "Transfer_Date": "1071022"
    },
    {
      "Issue_No": "桃稅蘆1064413642",
  "Issue_Date": "1070925",
  "Class_Type": "D",
  "Send_Class_ID": "H39210603396",
  "Duty_Name": "黃○瑞　 　 使用人：黃○瑞",
  "Duty_Birthday": "0231225",
  "Duty_ZipCode": "103",
  "Duty_Addr": "台北市士林區福國路100-4號1F",
  "Legal_Case_ID": "0470",
  "Pay_Amt": 25866,
  "Protect_Exit_Org": false,
  "Protect_Punish_Org": false,
  "Protect_Guar_Org": false,
  "Protect_Sei_Org": true,
  "Protect_Closed_Org": false,
  "Pay_Period_Due_Date": "1090423",
  "Is_Punishment": false,
  "End_File_No": "",
  "End_File_Date": "",
  "BatchNo": "",
  "BatchYear": "",
  "End_Print_Date": "",
  "End_Valid_Date": "",
  "Agency_Id": "CY",
  "Transfer_Agency_Id": "103004",
  "Transfer_Date": "1071021"
    }
  ];
   
   let odResources = [];
   
  odModel.forEach((od)=> {
    console.log({od});
    const odr = factory.newResource(namespace, 'OfficialDocument', od.Issue_No);
    
    for (var key in od) {
      if (od.hasOwnProperty(key) && key !== 'Issue_No') {
        let value = od[key];
      	odr[key] = value;
        console.log({key,value});
      }
  }
    odResources.push(odr);
  });
  
  const odRegistry = await getAssetRegistry(namespace + '.OfficialDocument');
   console.log({odResources});
  await odRegistry.addAll(odResources);
   
  
  
}

/**
  * @param {org.example.archive.Archive} archive
  * @transaction 
  */
async function archive(archive) {
  console.log('archive');

  const factory = getFactory();
  const NS = 'org.example.archive'; 
  
  archive.od.End_File_No = archive.End_File_No;
  console.log('archive.od.End_File_No:' + archive.End_File_No);
  archive.od.End_File_Date = archive.End_File_Date;
  archive.od.BatchNo = archive.BatchNo;
  archive.od.BatchYear = archive.BatchYear;
  archive.od.End_File_Submiter = archive.End_File_Submiter;
  
  // Get the asset registry for the asset.
  let assetRegistry = await getAssetRegistry('org.example.archive.OfficialDocument');

  // Update the asset in the asset registry. Again, note
  // that update() returns a promise, so we have to return
  // the promise so that Composer waits for it to be resolved.
  await assetRegistry.update(archive.od);
  
  const archiveEvent = factory.newEvent(NS, 'ArchiveEvent');
  archiveEvent.od = archive.od;
  emit(archiveEvent);
}

/**
  * @param {org.example.archive.ArchivePrint} archivePrint
  * @transaction 
  */
async function archivePrint(archivePrint) {
  console.log('archivePrint');

  const factory = getFactory();
  const NS = 'org.example.archive'; 
  
  archivePrint.od.End_Print_Date = archivePrint.End_Print_Date;
  archivePrint.od.End_File_Printer = archivePrint.End_File_Printer;
  
  // Get the asset registry for the asset.
  let assetRegistry = await getAssetRegistry('org.example.archive.OfficialDocument');

  // Update the asset in the asset registry. Again, note
  // that update() returns a promise, so we have to return
  // the promise so that Composer waits for it to be resolved.
  await assetRegistry.update(archivePrint.od);
  
  const archivePrintEvent = factory.newEvent(NS, 'ArchivePrintEvent');
  archivePrintEvent.od = archivePrint.od;
  emit(archivePrintEvent);
}

/**
  * @param {org.example.archive.Inquiry} inquiry
  * @transaction 
  */
async function inquiry(inquiry) {
  console.log('inquiry');
  
  // let assetRegistry = await getAssetRegistry('org.example.mynetwork.Commodity');
  let results = await query('selectOfficialDocument', { Issue_No: inquiry.od.Issue_No });

  for (let n = 0; n < results.length; n++) {
    let od = results[n];
    console.log(od);
  }
}

/**
  * @param {org.example.archive.InquiryHistorian} tx
  * @transaction 
  */
async function inquiryHistorian(tx) {
  console.log('inquiryHistorian');
  
  let results = await query('selectHistorian', {});
  console.log('results.length: ' + results.length);
  for (let n = 0; n < results.length; n++) {
    let od = results[n];
    console.log(od);
  }
}


/**
  * @param {org.example.archive.QueryHistorian} tx
  * @transaction 
  
async function queryHistorian(tx) {
  console.log('queryHistorian');
  
  const issue_no = tx.Issue_No;
  
  const nativeKey = getNativeAPI().createCompositeKey('Asset:org.example.archive.Archive',[issue_no]);
   const iterator = await getNativeAPI().getHistoryForKey(nativeKey);
  let results = [];
  let res = {done: false};
  
  while (!res.done) {
    res = await iterator.next();

    if (res && res.value && res.value.value) {
      let val = res.value.value.toString('utf8');
      if (val.length > 0) {
        results.push(JSON.parse(val));
      }
    }
    if (res && res.done) {
      try {
        iterator.close();
      }
      catch (err) {
      }
    }
  }
  
}
*/

