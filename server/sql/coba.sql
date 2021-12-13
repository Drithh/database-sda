SELECT T.name
FROM [DB_TableInfo] D
    join sys.tables T ON D.TableID = T.object_id
WHERE D.Type = 'R'