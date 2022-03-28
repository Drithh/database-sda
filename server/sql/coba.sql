-- CREATE VIEW VIEW8
-- AS
-- 	SELECT *
-- 	FROM PERUSAHAAN
-- 	WHERE Id IN (
-- 			 SELECT TOP(1)
-- 		P.Id
-- 	FROM PERUSAHAAN P
-- 		JOIN MENGOLAH M ON P.Id=M.IdPerusahaan
-- 	WHERE M.IdKomoditi IN  (
-- 									 SELECT SDA.Id
-- 	FROM SUMBER_DAYA_ALAM SDA
-- 	WHERE SDA.Jenis='Terbarukan'
-- 									)
-- 	ORDER BY M.Luas DESC, P.TahunBerdiri ASC
-- 			)


-- CREATE VIEW VIEW9
-- AS
-- 	SELECT *
-- 	FROM SUMBER_DAYA_ALAM
-- 	WHERE Id IN (
-- 			 SELECT TOP(1)
-- 		P.Id
-- 	FROM PERKEBUNAN P
-- 	WHERE P.SuhuOptimal <	(SELECT AVG(SuhuOptimal)
-- 	FROM PERKEBUNAN)
-- 	ORDER BY WaktuPanen DESC
-- 			)

-- CREATE VIEW VIEW10
-- AS
-- 	SELECT SUMBER_DAYA_ALAM.NamaKomoditi
-- 	FROM SUMBER_DAYA_ALAM
-- 	WHERE SUMBER_DAYA_ALAM.Id IN (
--     SELECT TOP(1)
-- 		BERADA_DI.IdKomoditi
-- 	FROM BERADA_DI
-- 	WHERE BERADA_DI.IdKomoditi IN(
--         SELECT PERTAMBANGAN.Id
-- 	FROM PERTAMBANGAN
-- 	WHERE PERTAMBANGAN.Asal = 'Sedimentasi'
--     )
-- 	GROUP BY BERADA_DI.IdKomoditi
-- 	ORDER BY COUNT(BERADA_DI.IdKota) DESC
-- )

-- CREATE VIEW VIEW11
-- AS
-- 	SELECT *
-- 	FROM SUMBER_DAYA_ALAM
-- 	WHERE Id IN (
-- 			 SELECT TOP(1)
-- 		MN.Id
-- 	FROM MINERAL MN
-- 		JOIN (
-- 					 SELECT MG.IdKomoditi, COUNT(*) countKomoditi
-- 		FROM MENGOLAH MG
-- 		GROUP BY MG.IdKomoditi
-- 					) AS olahP ON MN.Id=olahP.IdKomoditi
-- 	WHERE MN.KekerasanMohs >  (SELECT AVG(KekerasanMohs)
-- 	FROM MINERAL)
-- 	ORDER BY olahP.countKomoditi DESC
-- 			)
USE DATAVERSE;
    GO
SELECT * FROM SUMBER_DAYA_ALAM