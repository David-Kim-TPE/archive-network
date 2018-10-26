
/**
  * @param {org.example.archive.Test} test
  * @transaction 
  */
 async function test(test) {
    console.log('test');
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
  
  