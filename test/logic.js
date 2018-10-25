
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
    * @param {org.example.archive.Query} tx
    * @transaction 
    */
  async function Query(tx) {
    console.log('query');
    
    // let assetRegistry = await getAssetRegistry('org.example.mynetwork.Commodity');
    let results = await query('selectOfficialDocument');
  
    for (let n = 0; n < results.length; n++) {
      let od = results[n];
  
      console.log(od);
    }
  }
  
  