sqlite3 dev.db .schema > nodata.sql ; 
 
sqlite3 empty.db < nodata.sql;
