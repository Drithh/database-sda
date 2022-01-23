export const VIEW = [
  {
    title:
      'Potensi sumber daya alam mineral yang memiliki jumlah bijih paling banyak yang berlokasi di unit geografis Kalimantan',
    value: '1',
  },
  {
    title:
      'Perusahaan selain PT yang menyumbang pendapatan terbesar di Indonesia',
    value: '2',
  },
  {
    title:
      'Perusahaan milik negara yang menjual barang olahan paling banyak ke perusahaan swasta',
    value: '3',
  },
  {
    title: 'Sumber daya alam yang memiliki kegunaan paling banyak',
    value: '4',
  },
  {
    title:
      'Komoditi Kehutanan dan Nama Familinya dengan waktu pertumbuhan paling lama dan hanya dapat tumbuh di dataran rendah',
    value: '5',
  },
  {
    title: 'Provinsi yang paling banyak ditempati oleh perusahaan milik negara',
    value: '6',
  },
  {
    title: 'Provinsi yang paling banyak memiliki potensi mineral',
    value: '7',
  },
  {
    title:
      'Perusahaan paling tua yang mengolah sumber daya alam terbarukan dengan lahan paling luas',
    value: '8',
  },
  {
    title:
      'Komoditas perkebunan dengan suhu optimal di bawah rata-rata dan memiliki waktu panen paling lama',
    value: '9',
  },
  {
    title:
      'Komoditas pertambangan yang berasal dari sedimentasi dan paling banyak tersebar di indonesia',
    value: '10',
  },
  {
    title:
      'Komoditas mineral dengan kekerasan mohs di atas rata-rata dan paling banyak diolah oleh perusahaan',
    value: '11',
  },
  {
    title: 'Nama english dari komoditas tanah dengan ukuran paling kecil',
    value: '12',
  },
  {
    title:
      'Komoditas tanah dan jenisnya yang memiliki kandungan unsur paling banyak',
    value: '13',
  },
  {
    title:
      'Komoditas mineral paling banyak diolah di unit geografis Kalimantan',
    value: '14',
  },
  {
    title:
      'Komoditas minyak bumi dengan jumlah atom di atas rata-rata yang memiliki titik didih paling tinggi',
    value: '15',
  },
  {
    title:
      'Kandungan unsur yang paling sering di kandung oleh Sumber Daya Alam Tanah',
    value: '16',
  },
  {
    title:
      'Nama Sumber Daya Alam Tidak Terbarukan dan termasuk Golongan Senyawa Hidrokarbon yang memberikan pendapatan terbesar di Sumatera',
    value: '17',
  },
  {
    title:
      'Nama Tanaman Perkebunan yang paling banyak dibudidaya dan jenisnya merupakan tanaman musiman',
    value: '18',
  },
  {
    title:
      'Nama Sumber Daya Alam Tak Terbarukan yang diolah di atas tanah dengan total luas paling kecil',
    value: '19',
  },
  {
    title:
      'Sumber Daya Alam Terbarukan yang memberikan pendapatan terbesar di Unit Geografis Jawa',
    value: '20',
  },
  {
    title:
      'Nama English dari komoditas kehutanan yang memiliki kepadatan kayu paling tinggi',
    value: '21',
  },
  {
    title:
      'Alamat jalan dari Perusahaan Negara yang mengolah sumber daya alam terbarukan dan memiliki anak perusahaan paling banyak',
    value: '22',
  },
  {
    title: 'Nama Olahan yang paling banyak dibeli oleh perusahaan swasta',
    value: '23',
  },
  {
    title:
      'Perusahaan yang bukan PT dan mengolah komoditas jenis sumber daya alam paling banyak',
    value: '24',
  },
  {
    title:
      'Sumber Daya Alam yang diolah perusahaan dengan latitude diantara 3 - 5 inklusif dan longitude 90 - 100 inklusif',
    value: '25',
  },
  {
    title:
      'Tahun dengan pendapatan paling besar dari sumber daya alam terbarukan',
    value: '26',
  },
  {
    title: 'Perusahaan Swasta termuda yang bergerak dalam sektor migas',
    value: '27',
  },
  {
    title:
      'Nama komoditas Pertambangan dengan Golongan Logam Transisi yang kilaunya Metalik',
    value: '28',
  },
  {
    title:
      'Nama Wilayah Provinsi dan Sumber Daya Alam yang diolah bukan di atas tanah atau di bawah tanah dengan luas terbesar',
    value: '29',
  },
  {
    title: 'Perusahaan yang memiliki no telp paling banyak',
    value: '30',
  },
];

export const textConvert = (value) => {
  return VIEW[value - 1].title + ' adalah ';
};
