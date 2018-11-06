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
   
  
  let odModel = demo.ods;
   
   let odResources = [];
   
  odModel.forEach((od)=> {
    console.log({od});
    const odr = factory.newResource(namespace, 'OfficialDocument', encodeURI(od.Issue_No));
    
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

