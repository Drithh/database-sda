CREATE PROCEDURE Totalgdp AS DECLARE @NAMES TABLE (
    NAME NVARCHAR(20) PRIMARY KEY NOT NULL
  ) INSERT @NAMES (NAME) 
  VALUES 
    ('KEHUTANAN'), 
    ('PERKEBUNAN'), 
    ('MINERAL'), 
    ('TANAH'), 
    ('MINYAK_BUMI') DECLARE @CustomSQL AS NVARCHAR(500) DECLARE @NamaKomoditi NVARCHAR(20) WHILE EXISTS (
      SELECT 
        * 
      FROM 
        @NAMES
    ) BEGIN 
  SELECT 
    TOP(1) @NamaKomoditi = NAME 
  FROM 
    @NAMES 
  SET 
    @CustomSQL = 'SELECT SDA.NamaKomoditi AS name, SUM(H.Pendapatan) / 1000000 AS value FROM HASIL H     JOIN SUMBER_DAYA_ALAM SDA ON H.IdKomoditi = SDA.Id     WHERE H.IdKomoditi IN (         SELECT Id FROM ' + @NamaKomoditi + '      )     GROUP BY SDA.NamaKomoditi' EXEC (@CustomSQL) 
  DELETE FROM 
    @NAMES 
  WHERE 
    NAME = @NamaKomoditi END go CREATE VIEW toppotensi AS 
  SELECT 
    SDA.namakomoditi AS NAME, 
    Sum(BI.angka) / 1000 AS Total, 
    W.unitgeografis 
  FROM 
    berada_di BI 
    JOIN sumber_daya_alam SDA ON SDA.id = BI.idkomoditi 
    JOIN wilayah W ON W.id = BI.idkota 
  WHERE 
    BI.satuan = 'Bijih' 
    AND BI.idkomoditi IN (
      SELECT 
        TOP(6) BI1.idkomoditi 
      FROM 
        berada_di BI1 
      GROUP BY 
        BI1.idkomoditi 
      ORDER BY 
        Sum(BI1.angka) DESC
    ) 
  GROUP BY 
    SDA.namakomoditi, 
    W.unitgeografis go CREATE VIEW hasil5tahun AS 
  SELECT 
    SDA.namakomoditi, 
    H.tahun, 
    H.angka 
  FROM 
    sumber_daya_alam SDA 
    JOIN hasil H ON H.idkomoditi = SDA.id 
  WHERE 
    satuan = 'Ton' 
    AND SDA.id IN (
      SELECT 
        H.idkomoditi 
      FROM 
        hasil H 
      GROUP BY 
        H.idkomoditi 
      HAVING 
        Sum(H.tahun) = 10090
    )
  
CREATE VIEW toppotensi AS 
SELECT 
  SDA.namakomoditi, 
  Sum(BI.angka) AS Total, 
  W.unitgeografis 
FROM 
  berada_di BI 
  JOIN sumber_daya_alam SDA ON SDA.id = BI.idkomoditi 
  JOIN wilayah W ON W.id = BI.idkota 
WHERE 
  BI.satuan = 'Bijih' 
  AND BI.idkomoditi IN (
    SELECT 
      TOP(6) BI1.idkomoditi 
    FROM 
      berada_di BI1 
    GROUP BY 
      BI1.idkomoditi 
    ORDER BY 
      Sum(BI1.angka) DESC
  ) 
GROUP BY 
  SDA.namakomoditi, 
  W.unitgeografis 
DROP 
  VIEW toppotensi 
SELECT 
  * 
FROM 
  toppotensi


CREATE VIEW view1 AS 
SELECT 
  SDA.namakomoditi 
FROM 
  [DATAVERSE].dbo.sumber_daya_alam SDA 
WHERE 
  SDA.id IN(
    SELECT 
      mineral.id 
    FROM 
      dataverse.dbo.mineral 
    WHERE 
      mineral.id IN(
        SELECT 
          TOP (1) berada_di.idkomoditi 
        FROM 
          dbo.berada_di 
        WHERE 
          berada_di.idkota IN (
            SELECT 
              wilayah.id 
            FROM 
              [dbo].[wilayah] 
            WHERE 
              wilayah.unitgeografis = 'Kalimantan'
          ) 
        GROUP BY 
          berada_di.idkomoditi 
        ORDER BY 
          Count(berada_di.idkomoditi) DESC
      )
  ) go CREATE VIEW view2 AS 
SELECT 
  TOP(1) P.nama 
FROM 
  perusahaan P 
  RIGHT JOIN hasil H ON P.id = H.idperusahaan 
WHERE 
  P.jenis <> 'PT' 
ORDER BY 
  H.pendapatan DESC go CREATE VIEW view3 AS 
SELECT 
  * 
FROM 
  perusahaan 
WHERE 
  id IN (
    SELECT 
      TOP(1) PS.idperusahaanbeli 
    FROM 
      perusahaan P 
      RIGHT JOIN perusahaan_swasta PS ON P.id = PS.id 
    WHERE 
      PS.idperusahaanbeli IS NOT NULL 
    GROUP BY 
      PS.idperusahaanbeli 
    ORDER BY 
      Count(PS.idperusahaanbeli) DESC
  ) go CREATE VIEW view4 AS 
SELECT 
  * 
FROM 
  sumber_daya_alam 
WHERE 
  id IN (
    SELECT 
      TOP(1) SDA.id 
    FROM 
      sumber_daya_alam SDA 
      JOIN kegunaan K ON SDA.id = K.id 
    GROUP BY 
      SDA.id 
    ORDER BY 
      Count(K.id) DESC
  ) go CREATE VIEW view5 AS 
SELECT 
  TOP(1) SDA.namakomoditi, 
  K.famili 
FROM 
  kehutanan K 
  JOIN sumber_daya_alam SDA ON K.id = SDA.id 
WHERE 
  K.kesesuaianekologis = 'Dataran rendah' 
ORDER BY 
  K.pertumbuhan DESC go CREATE VIEW view6 AS 
SELECT 
  * 
FROM 
  wilayah 
WHERE 
  id = (
    SELECT 
      TOP(1) W.id 
    FROM 
      wilayah W 
      JOIN perusahaan P ON W.id = P.idwilayah 
    GROUP BY 
      W.id 
    ORDER BY 
      Count(P.idwilayah) DESC
  ) go CREATE VIEW view7 AS 
SELECT 
  TOP (1) wilayah.provinsi 
FROM 
  wilayah 
WHERE 
  wilayah.id IN(
    SELECT 
      berada_di.idkota 
    FROM 
      berada_di 
    WHERE 
      berada_di.idkomoditi IN (
        SELECT 
          mineral.id 
        FROM 
          mineral
      )
  ) 
GROUP BY 
  wilayah.provinsi 
ORDER BY 
  Count(wilayah.provinsi) DESC go CREATE VIEW view8 AS 
SELECT 
  * 
FROM 
  perusahaan 
WHERE 
  id IN (
    SELECT 
      TOP(1) P.id 
    FROM 
      perusahaan P 
      JOIN mengolah M ON P.id = M.idperusahaan 
    WHERE 
      M.idkomoditi IN (
        SELECT 
          SDA.id 
        FROM 
          sumber_daya_alam SDA 
        WHERE 
          SDA.jenis = 'Terbarukan'
      ) 
    ORDER BY 
      M.luas DESC, 
      P.tahunberdiri ASC
  ) go CREATE VIEW view9 AS 
SELECT 
  * 
FROM 
  sumber_daya_alam 
WHERE 
  id IN (
    SELECT 
      TOP(1) P.id 
    FROM 
      perkebunan P 
    WHERE 
      P.suhuoptimal < (
        SELECT 
          Avg(suhuoptimal) 
        FROM 
          perkebunan
      ) 
    ORDER BY 
      waktupanen DESC
  ) go CREATE VIEW view10 AS 
SELECT 
  sumber_daya_alam.namakomoditi 
FROM 
  sumber_daya_alam 
WHERE 
  sumber_daya_alam.id IN (
    SELECT 
      TOP(1) berada_di.idkomoditi 
    FROM 
      berada_di 
    WHERE 
      berada_di.idkomoditi IN(
        SELECT 
          pertambangan.id 
        FROM 
          pertambangan 
        WHERE 
          pertambangan.asal = 'Sedimentasi'
      ) 
    GROUP BY 
      berada_di.idkomoditi 
    ORDER BY 
      Count(berada_di.idkota) DESC
  ) go CREATE VIEW view11 AS 
SELECT 
  * 
FROM 
  sumber_daya_alam 
WHERE 
  id IN (
    SELECT 
      TOP(1) MN.id 
    FROM 
      mineral MN 
      JOIN (
        SELECT 
          MG.idkomoditi, 
          Count(*) countKomoditi 
        FROM 
          mengolah MG 
        GROUP BY 
          MG.idkomoditi
      ) AS olahP ON MN.id = olahP.idkomoditi 
    WHERE 
      MN.kekerasanmohs > (
        SELECT 
          Avg(kekerasanmohs) 
        FROM 
          mineral
      ) 
    ORDER BY 
      olahP.countkomoditi DESC
  ) go CREATE VIEW view12 AS 
SELECT 
  SDA.namaenglish 
FROM 
  sumber_daya_alam SDA 
WHERE 
  SDA.id IN(
    SELECT 
      TOP(1) tanah.id 
    FROM 
      tanah 
    ORDER BY 
      tanah.ukuran ASC
  ) go CREATE VIEW view13 AS 
SELECT 
  SDA.namakomoditi, 
  SDA.jenis 
FROM 
  sumber_daya_alam SDA 
WHERE 
  SDA.id = (
    SELECT 
      TOP(1) T.id 
    FROM 
      tanah T 
      JOIN kandungan_tanah KT ON T.id = KT.id 
    GROUP BY 
      T.id 
    ORDER BY 
      Count(*) DESC
  ) go CREATE VIEW view14 AS 
SELECT 
  sumber_daya_alam.namakomoditi 
FROM 
  sumber_daya_alam 
WHERE 
  sumber_daya_alam.id IN (
    SELECT 
      mengolah.idkomoditi 
    FROM 
      mengolah 
    WHERE 
      mengolah.idkota IN (
        SELECT 
          TOP(1) mengolah.idkota 
        FROM 
          mengolah 
        WHERE 
          mengolah.idkota IN(
            SELECT 
              wilayah.id 
            FROM 
              wilayah 
            WHERE 
              wilayah.unitgeografis = 'Kalimantan'
          ) 
        GROUP BY 
          mengolah.idkota 
        ORDER BY 
          Count(mengolah.idkomoditi) DESC
      )
  ) 
  AND sumber_daya_alam.id IN(
    SELECT 
      mineral.id 
    FROM 
      mineral
  ) go CREATE VIEW view15 AS 
SELECT 
  * 
FROM 
  sumber_daya_alam 
WHERE 
  id IN (
    SELECT 
      TOP(1) MYK.id 
    FROM 
      minyak_bumi MYK 
    WHERE 
      MYK.jumlahatom > (
        SELECT 
          Avg(jumlahatom) 
        FROM 
          minyak_bumi
      ) 
    ORDER BY 
      MYK.titikdidih DESC
  ) go CREATE VIEW view16 AS 
SELECT 
  TOP(1) KT.kandungan 
FROM 
  kandungan_tanah KT 
GROUP BY 
  KT.kandungan 
ORDER BY 
  Count(KT.id) DESC go CREATE VIEW view17 AS 
SELECT 
  TOP(1) SDA.namakomoditi, 
  Sum(HS.pendapatan) AS 'Pendapatan Total (Rp)' 
FROM 
  sumber_daya_alam SDA 
  JOIN pertambangan PR ON SDA.id = PR.id 
  JOIN hasil HS ON SDA.id = HS.idkomoditi 
WHERE 
  SDA.jenis = 'Tidak Terbarukan' 
  AND PR.golongan = 'Senyawa Hidrokarbon' 
GROUP BY 
  SDA.namakomoditi 
ORDER BY 
  Sum(HS.pendapatan) DESC go CREATE VIEW view18 AS 
SELECT 
  sumber_daya_alam.namakomoditi 
FROM 
  sumber_daya_alam 
WHERE 
  sumber_daya_alam.id IN(
    SELECT 
      TOP(1) mengolah.idkomoditi 
    FROM 
      mengolah 
    WHERE 
      mengolah.idkomoditi IN(
        SELECT 
          perkebunan.id 
        FROM 
          perkebunan 
        WHERE 
          perkebunan.jenistanaman = 'Musiman'
      ) 
    GROUP BY 
      mengolah.idkomoditi 
    ORDER BY 
      Count(mengolah.latitude) DESC
  ) go CREATE VIEW view19 AS 
SELECT 
  * 
FROM 
  sumber_daya_alam 
WHERE 
  sumber_daya_alam.jenis = 'Tidak Terbarukan' 
  AND sumber_daya_alam.id IN(
    SELECT 
      mengolah.idkomoditi 
    FROM 
      mengolah 
    WHERE 
      mengolah.jenispengolahan = 'Di atas tanah' 
      AND mengolah.luas IN (
        SELECT 
          TOP(1) mengolah.luas 
        FROM 
          mengolah 
        ORDER BY 
          mengolah.luas ASC
      )
  ) go CREATE VIEW view20 AS 
SELECT 
  * 
FROM 
  sumber_daya_alam 
WHERE 
  id IN (
    SELECT 
      TOP(1) SDA.id 
    FROM 
      sumber_daya_alam SDA 
      JOIN hasil H ON SDA.id = H.idkomoditi 
    WHERE 
      SDA.jenis = 'Terbarukan' 
      AND H.idkota IN (
        SELECT 
          W.id 
        FROM 
          wilayah W 
        WHERE 
          W.unitgeografis = 'Jawa'
      ) 
    GROUP BY 
      SDA.id 
    ORDER BY 
      Sum(H.pendapatan) DESC
  ) go CREATE VIEW view21 AS 
SELECT 
  TOP(1) SDA.namaenglish 
FROM 
  sumber_daya_alam SDA 
  JOIN kehutanan K ON SDA.id = K.id 
ORDER BY 
  K.kepadatankayu DESC go CREATE VIEW view22 AS 
SELECT 
  TOP(1) P.alamat, 
  sumchild 
FROM 
  perusahaan P 
  JOIN (
    SELECT 
      P.idinduk, 
      Count(*) sumChild 
    FROM 
      perusahaan P 
    WHERE 
      P.idinduk IS NOT NULL 
    GROUP BY 
      P.idinduk
  ) AS CHILD ON P.id = CHILD.idinduk 
WHERE 
  P.milik = 'Negara' 
  AND P.id IN (
    SELECT 
      M.idperusahaan 
    FROM 
      mengolah M 
    WHERE 
      M.idkomoditi IN (
        SELECT 
          SDA.id 
        FROM 
          sumber_daya_alam SDA 
        WHERE 
          SDA.jenis = 'Terbarukan'
      )
  ) 
ORDER BY 
  sumchild DESC go CREATE VIEW view23 AS 
SELECT 
  TOP(1) namaolahan 
FROM 
  perusahaan_swasta 
WHERE 
  namaolahan IS NOT NULL 
GROUP BY 
  namaolahan 
ORDER BY 
  Count(*) DESC go CREATE VIEW view24 AS 
SELECT 
  * 
FROM 
  perusahaan 
WHERE 
  id IN (
    SELECT 
      TOP(1) P.id 
    FROM 
      perusahaan P 
      JOIN mengolah M ON P.id = M.idperusahaan 
    WHERE 
      P.jenis <> 'PT' 
    GROUP BY 
      P.id 
    ORDER BY 
      Count(*) DESC
  ) go CREATE VIEW view25 AS 
SELECT 
  * 
FROM 
  sumber_daya_alam 
WHERE 
  sumber_daya_alam.id IN(
    SELECT 
      mengolah.idkomoditi 
    FROM 
      mengolah 
    WHERE 
      mengolah.latitude > 3 
      AND mengolah.latitude < 5 
      AND mengolah.longitude > 90 
      AND mengolah.longitude < 100
  ) go CREATE VIEW view26 AS 
SELECT 
  TOP(1) H.tahun 
FROM 
  hasil H 
  JOIN sumber_daya_alam SDA ON H.idkomoditi = SDA.id 
WHERE 
  SDA.jenis = 'Terbarukan' 
GROUP BY 
  H.tahun 
ORDER BY 
  Sum(H.pendapatan) DESC go CREATE VIEW view27 AS 
SELECT 
  * 
FROM 
  perusahaan 
WHERE 
  id IN (
    SELECT 
      TOP(1) P.id 
    FROM 
      perusahaan P 
      JOIN perusahaan_swasta PS ON P.id = PS.id 
    WHERE 
      P.sektor = 'Migas' 
    ORDER BY 
      P.tahunberdiri DESC
  ) go CREATE VIEW view28 AS 
SELECT 
  * 
FROM 
  sumber_daya_alam SDA 
WHERE 
  SDA.id IN(
    SELECT 
      pertambangan.id 
    FROM 
      pertambangan 
    WHERE 
      pertambangan.golongan = 'Logam Transisi' 
      AND pertambangan.id IN(
        SELECT 
          mineral.id 
        FROM 
          mineral 
        WHERE 
          mineral.kilau = 'Metalik'
      )
  ) go CREATE VIEW view29 AS 
SELECT 
  TOP(1) W.provinsi 
FROM 
  wilayah W 
  JOIN mengolah M ON W.id = M.idkota 
WHERE 
  M.jenispengolahan NOT IN (
    'Di atas tanah', 'Di bawah tanah'
  ) 
ORDER BY 
  M.luas DESC;
go CREATE VIEW view30 AS 
SELECT 
  * 
FROM 
  perusahaan 
WHERE 
  id IN (
    SELECT 
      TOP(1) T.id 
    FROM 
      telepon T 
    GROUP BY 
      T.id 
    ORDER BY 
      Count(T.telepon) DESC
  )
