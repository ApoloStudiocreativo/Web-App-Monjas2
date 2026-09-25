// Holy Week Museum - Single Page Application
// Navigation and Section Management

class MuseumApp {
    constructor() {
        this.currentSection = 'splash';
        this.sections = ['splash', 'home', 'viewer', 'calendar', 'info', 'panorama'];
        this.currentModelIndex = -1;
        this.currentAudio = null; // Track current audio object

        // En cada carga nueva de página, resetear el flag de pestaña activa.
        // Así la splash screen se muestra SIEMPRE en cargas nuevas (F5, link externo).
        // El flag se reactiva solo cuando el usuario pulsa "Entrar a la experiencia".
        sessionStorage.removeItem('museumTabActive');

        // Data for all models (restored user edits)
        this.modelsData = [
            // 0: Vista 360
            {
                type: 'panorama',
                folder: 'HDR',
                title: 'Vista 360º del Museo',
                image: 'models/HDR/HDR.jpg'
            },
            // 1: Cristo de la Expiración
            {
                folder: 'jesus-en-la-cruz',
                title: 'Cristo de papelón',
                subtitle: '',
                description: 'Jesús en la cruz, de tamaño reducido y técnica de papelón, representado en postura clásica del Calvario, con paño de pureza y corona de espinas.',
                typology: 'Escultura',
                material: 'Madera policromada',
                date: 'S. XVI',
                author: 'Francisco Antonio Ruiz Gijón',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfN9S0WWiJ95lfu4UNRBzSnms4j9Pw84G5WwnHxk-ew58PQC6fGMha6NmPuMuiO4t-qAb6sConG5Ln2z1PffIbpyC8WGIsLZqba4StzFvN4APxQPEipy-SC37mgk1ut1USLAMf_JVfGGcowEa6CVVe2R1cvH3JKGXAT6p-e10lfS0L2zNaO45L0MkoAoYOxA68Gq8DComxFB7u2d2lBvsxgeCFGWkQMyBoD63DPEaIIF5HSSZfq8UGKUbrJ0ZEma6-CQSmHd3_t7pG',
                audio: 'Cristo_de_papel.mp3'
            },
            // 2: Virgen de Mena
            {
                folder: 'virgen-de-mena',
                title: 'Virgen de Mena',
                subtitle: '',
                description: 'Excelente obra escultórica con categoría de obra maestra. La Virgen, con las manos unidas y el rostro afligido, expresa su dolor interior ante la Pasión de su Hijo, en intensa actitud orante.',
                typology: 'Escultura',
                material: 'Madera policromada',
                date: 'Siglo XVII',
                author: 'Pedro de Mena',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzC_hm7V1bWV9i8mL6WIB4ZP5sNzktegKirG6NBLgnndTwtnM67470rr6a0LYMJUTifwN7svOzXlRaUEkgXZlhBWYaMoKGOYkbAWbktiIo5cr9za34Tlv5Xm29zNOwq0xPSkEPIqN2Vx0rJN-25_D9EjfR3vKv_josSFPQ0wiwVFDf8jypNo8S1BXAw5feK8mB-jPsuSo3c5zrsrt5ljk3QuJveqmIdcD2AhO_Vl_JDtrY-oIbZPa6zBBqGjt7BaSPlv8n8RD18aL-',
                audio: 'dolorosa.mp3'
            },
            // 3: Jesús del Gran Poder
            {
                folder: 'ecce-homo',
                title: 'Ecce-homo',
                subtitle: '',
                description: 'Efigie de Cristo tras la flagelación, semidesnudo, atado, con heridas visibles, mostrando su cuerpo maltratado para ser presentado al pueblo',
                typology: 'Escultura',
                material: 'Madera policromada',
                date: 'Siglo XVII',
                author: 'Francisco Alonso de los Rios',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfh129AfUoh3GB0nUMz9SDvM4m1ANM6UJHh0qoM27jL0iw-ryYHi3d0GM1kukbxfqg13expCwxe-h-tB7DZDN0ytLwC5SyDdYSJIrEyo-SXVRgZq_mXjC3hlAnTxBB4vCqP5Xw2jxKhDkjxcBWaNRpNcjBH4G7S5eOezmREeBQfozKoisSSX5QW9T-WcS9JJziKFBcw6N50FnTo3eoFjhM_rY4tzH83ZA9Xl5YwANh3smu_oQn8QvKjm8wrlW8SW4TJgv30ykSCmYu',
                audio: 'ecce-homo.mp3'
            },
            // 4: Explore Button (Skipped)
            null,
            // 5: Bayeu Inmaculada
            {
                folder: 'bayeu-inmaculada',
                title: 'Cuadro Bayeu Inmaculada',
                subtitle: '',
                description: 'Escultura barroca en madera policromada que representa el cuerpo de Cristo tras su descendimiento',
                typology: 'Pintura',
                material: 'Óleo sobre lienzo',
                date: 'Siglo XVIII',
                author: 'Ramón Bayeu',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfN9S0WWiJ95lfu4UNRBzSnms4j9Pw84G5WwnHxk-ew58PQC6fGMha6NmPuMuiO4t-qAb6sConG5Ln2z1PffIbpyC8WGIsLZqba4StzFvN4APxQPEipy-SC37mgk1ut1USLAMf_JVfGGcowEa6CVVe2R1cvH3JKGXAT6p-e10lfS0L2zNaO45L0MkoAoYOxA68Gq8DComxFB7u2d2lBvsxgeCFGWkQMyBoD63DPEaIIF5HSSZfq8UGKUbrJ0ZEma6-CQSmHd3_t7pG',
                audio: 'Cuadro_Bayeu_Inmaculada.mp3'
            },
            // 6: Bayeu San Benito
            {
                folder: 'bayeu-san-benito',
                title: 'Cuadro Bayeu San Benito',
                subtitle: '',
                description: 'Escultura barroca en madera policromada que representa el cuerpo de Cristo tras su descendimiento.',
                typology: 'Pintura',
                material: 'Óleo sobre lienzo',
                date: 'Siglo XVIII',
                author: 'Ramón Bayeu',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfN9S0WWiJ95lfu4UNRBzSnms4j9Pw84G5WwnHxk-ew58PQC6fGMha6NmPuMuiO4t-qAb6sConG5Ln2z1PffIbpyC8WGIsLZqba4StzFvN4APxQPEipy-SC37mgk1ut1USLAMf_JVfGGcowEa6CVVe2R1cvH3JKGXAT6p-e10lfS0L2zNaO45L0MkoAoYOxA68Gq8DComxFB7u2d2lBvsxgeCFGWkQMyBoD63DPEaIIF5HSSZfq8UGKUbrJ0ZEma6-CQSmHd3_t7pG',
                audio: 'Cuadro_Bayeu_SanBenito.mp3'
            },
            // 7: Bayeu Santa Gertrudis
            {
                folder: 'bayeu-santa-gertrudis',
                title: 'Cuadro Bayeu Santa Escolástica',
                subtitle: '',
                description: 'Escultura barroca en madera policromada que representa el cuerpo de Cristo tras su descendimiento',
                typology: 'Pintura',
                material: 'Óleo sobre lienzo',
                date: 'Siglo XVIII',
                author: 'Ramón Bayeu',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfN9S0WWiJ95lfu4UNRBzSnms4j9Pw84G5WwnHxk-ew58PQC6fGMha6NmPuMuiO4t-qAb6sConG5Ln2z1PffIbpyC8WGIsLZqba4StzFvN4APxQPEipy-SC37mgk1ut1USLAMf_JVfGGcowEa6CVVe2R1cvH3JKGXAT6p-e10lfS0L2zNaO45L0MkoAoYOxA68Gq8DComxFB7u2d2lBvsxgeCFGWkQMyBoD63DPEaIIF5HSSZfq8UGKUbrJ0ZEma6-CQSmHd3_t7pG',
                audio: 'Cuadro_Bayeu_Santa_Escolastica.mp3'
            },
            // 8: San Bernardo (Tránsito de San José)
            {
                folder: 'goya-transito-de-san-jose',
                title: 'Cuadro Goya Tránsito de San José',
                subtitle: '',
                description: 'Escultura barroca en madera policromada que representa el cuerpo de Cristo tras su descendimiento.',
                typology: 'Pintura',
                material: 'Óleo sobre lienzo',
                date: 'Siglo XVIII',
                author: 'Francisco de Goya',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfN9S0WWiJ95lfu4UNRBzSnms4j9Pw84G5WwnHxk-ew58PQC6fGMha6NmPuMuiO4t-qAb6sConG5Ln2z1PffIbpyC8WGIsLZqba4StzFvN4APxQPEipy-SC37mgk1ut1USLAMf_JVfGGcowEa6CVVe2R1cvH3JKGXAT6p-e10lfS0L2zNaO45L0MkoAoYOxA68Gq8DComxFB7u2d2lBvsxgeCFGWkQMyBoD63DPEaIIF5HSSZfq8UGKUbrJ0ZEma6-CQSmHd3_t7pG',
                audio: 'Cuadro_Goya_El_transito_de_san_Jose.mp3'
            },
            // 9: Goya San Carlos
            {
                folder: 'goya-san-carlos-borromeo',
                title: 'Cuadro Goya San Bernardo',
                subtitle: '',
                description: 'Escultura barroca en madera policromada que representa el cuerpo de Cristo tras su descendimiento.',
                typology: 'Pintura',
                material: 'Óleo sobre lienzo',
                date: 'Siglo XVIII',
                author: 'Francisco de Goya',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfN9S0WWiJ95lfu4UNRBzSnms4j9Pw84G5WwnHxk-ew58PQC6fGMha6NmPuMuiO4t-qAb6sConG5Ln2z1PffIbpyC8WGIsLZqba4StzFvN4APxQPEipy-SC37mgk1ut1USLAMf_JVfGGcowEa6CVVe2R1cvH3JKGXAT6p-e10lfS0L2zNaO45L0MkoAoYOxA68Gq8DComxFB7u2d2lBvsxgeCFGWkQMyBoD63DPEaIIF5HSSZfq8UGKUbrJ0ZEma6-CQSmHd3_t7pG',
                audio: 'Cuadro_Goya_SanBernardo.mp3'
            },
            // 10: Goya Santa Engracia
            {
                folder: 'goya-santa-engracia',
                title: 'Cuadro Goya Santa Lutgarda',
                subtitle: '',
                description: 'Obra pictórica de Francisco de Goya.',
                typology: 'Pintura',
                material: 'Óleo sobre lienzo',
                date: 'Siglo XVIII',
                author: 'Francisco de Goya',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfN9S0WWiJ95lfu4UNRBzSnms4j9Pw84G5WwnHxk-ew58PQC6fGMha6NmPuMuiO4t-qAb6sConG5Ln2z1PffIbpyC8WGIsLZqba4StzFvN4APxQPEipy-SC37mgk1ut1USLAMf_JVfGGcowEa6CVVe2R1cvH3JKGXAT6p-e10lfS0L2zNaO45L0MkoAoYOxA68Gq8DComxFB7u2d2lBvsxgeCFGWkQMyBoD63DPEaIIF5HSSZfq8UGKUbrJ0ZEma6-CQSmHd3_t7pG',
                audio: 'Cuadro_Goya_Santa_Lutgarda_.mp3'
            },
            // 11: La Elevación de la Cruz
            {
                folder: 'la-elevacion-de-la-cruz',
                title: 'Cuadro la exaltación de la crúz',
                subtitle: '',
                description: 'Representación pictórica de la Elevación de la Cruz.',
                typology: 'Pintura',
                material: 'Óleo sobre tabla',
                date: 'Siglo XVII',
                author: 'Leandro Bassano',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfN9S0WWiJ95lfu4UNRBzSnms4j9Pw84G5WwnHxk-ew58PQC6fGMha6NmPuMuiO4t-qAb6sConG5Ln2z1PffIbpyC8WGIsLZqba4StzFvN4APxQPEipy-SC37mgk1ut1USLAMf_JVfGGcowEa6CVVe2R1cvH3JKGXAT6p-e10lfS0L2zNaO45L0MkoAoYOxA68Gq8DComxFB7u2d2lBvsxgeCFGWkQMyBoD63DPEaIIF5HSSZfq8UGKUbrJ0ZEma6-CQSmHd3_t7pG',
                audio: 'Elevacion_de_la_cruz.mp3'
            },
            // 12: Bargueño Relicario
            {
                folder: 'bargueno-relicario',
                title: 'Bargueño Relicario',
                subtitle: '',
                description: 'Mueble bargueño manierista con cajones acristalados que guardan reliquias, concebido como escritorio devocional con rica policromía ornamental.',
                typology: 'Escritorio-relicario, madera policromada con aplicación de corla',
                material: 'Madera y reliquias',
                date: 'Siglo XVI (1590-1595)',
                author: 'Anónimo',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfN9S0WWiJ95lfu4UNRBzSnms4j9Pw84G5WwnHxk-ew58PQC6fGMha6NmPuMuiO4t-qAb6sConG5Ln2z1PffIbpyC8WGIsLZqba4StzFvN4APxQPEipy-SC37mgk1ut1USLAMf_JVfGGcowEa6CVVe2R1cvH3JKGXAT6p-e10lfS0L2zNaO45L0MkoAoYOxA68Gq8DComxFB7u2d2lBvsxgeCFGWkQMyBoD63DPEaIIF5HSSZfq8UGKUbrJ0ZEma6-CQSmHd3_t7pG',
                audio: 'bargueno_relicario.mp3'
            },
            // 13: Casulla Santa Ana
            {
                folder: 'casulla-santa-ana',
                title: 'Casulla Santa Ana',
                subtitle: '',
                description: 'Casulla de seda ricamente bordada, con escenas y alegorías de virtudes teologales y cardinales, realizada por religiosas con técnica minuciosa. Bordados realizados en la seda con pinturas de las virtudes teologales y cardinales, bordeado con pasamanería en oro.',
                typology: 'Textil bordado y seda',
                material: 'Seda natural',
                date: 'Siglo XVIII (1787)',
                author: 'Religiosas del Real Monasterio de San Joaquín y Santa Ana',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfN9S0WWiJ95lfu4UNRBzSnms4j9Pw84G5WwnHxk-ew58PQC6fGMha6NmPuMuiO4t-qAb6sConG5Ln2z1PffIbpyC8WGIsLZqba4StzFvN4APxQPEipy-SC37mgk1ut1USLAMf_JVfGGcowEa6CVVe2R1cvH3JKGXAT6p-e10lfS0L2zNaO45L0MkoAoYOxA68Gq8DComxFB7u2d2lBvsxgeCFGWkQMyBoD63DPEaIIF5HSSZfq8UGKUbrJ0ZEma6-CQSmHd3_t7pG',
                audio: 'casulla.mp3'
            },
            // 14: Cristo Atado a la Columna
            {
                folder: 'cristo-atado-a-la-columna',
                title: 'Cristo Atado a la Columna',
                subtitle: '',
                description: 'Cristo semidesnudo, junto a la columna, con marcas de azotes visibles en el cuerpo, en el momento en que es presentado maniatado ante el suplicio.',
                typology: ' Madera Policromada, escuela castellana.',
                material: '',
                date: 'Siglo XVII (próximo a 1640)',
                author: 'Anónimo',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfN9S0WWiJ95lfu4UNRBzSnms4j9Pw84G5WwnHxk-ew58PQC6fGMha6NmPuMuiO4t-qAb6sConG5Ln2z1PffIbpyC8WGIsLZqba4StzFvN4APxQPEipy-SC37mgk1ut1USLAMf_JVfGGcowEa6CVVe2R1cvH3JKGXAT6p-e10lfS0L2zNaO45L0MkoAoYOxA68Gq8DComxFB7u2d2lBvsxgeCFGWkQMyBoD63DPEaIIF5HSSZfq8UGKUbrJ0ZEma6-CQSmHd3_t7pG',
                audio: 'cristo-atado-a-la-columna.mp3'
            },
            // 15: Cristo Yacente
            {
                folder: 'cristo-yacente',
                title: 'Cristo Yacente',
                subtitle: '',
                description: 'Cristo tras el Descendimiento, recostado sobre el sudario, con las huellas de la Pasión visibles, en calma y quietud previa a su sepultura. Figura yacente de Cristo de escuela barroca; destaca la policromía y el tratamiento anatómico.',
                typology: 'Escultura religiosa',
                material: 'Madera policromada',
                date: 'Siglo XVII',
                author: 'Gregorio Fernández',
                image: '',
                audio: 'cristo-yacente.mp3'
            },
            // 16: Novisimos
            {
                folder: 'novisimos',
                title: 'Novisimos',
                subtitle: '',
                description: 'Cuatro escenas alegóricas que representan los destinos finales del alma, desde la contemplación serena hasta su tránsito hacia estados purificadores. Marienismo tardío y el barroco temprano. Muestran los destinos del alma humana.',
                typology: 'Ceroplástica (Escultura realizada en cera)',
                material: '',
                date: 'Siglo XVII (1605)',
                author: 'Giovanni Bernardino Azzolino',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfN9S0WWiJ95lfu4UNRBzSnms4j9Pw84G5WwnHxk-ew58PQC6fGMha6NmPuMuiO4t-qAb6sConG5Ln2z1PffIbpyC8WGIsLZqba4StzFvN4APxQPEipy-SC37mgk1ut1USLAMf_JVfGGcowEa6CVVe2R1cvH3JKGXAT6p-e10lfS0L2zNaO45L0MkoAoYOxA68Gq8DComxFB7u2d2lBvsxgeCFGWkQMyBoD63DPEaIIF5HSSZfq8UGKUbrJ0ZEma6-CQSmHd3_t7pG',
                audio: 'novisimos.mp3'
            },
            // 17: Reliquia Dorada
            {
                folder: 'reliquia-dorada',
                title: 'Custodia',
                subtitle: '',
                description: 'Relicario de altar en metal dorado y gemas, con pequeño cristal tallado donde se aprecia la figura de Cristo, usado para proyectar su silueta en la liturgia.',
                typology: 'Orfebrería',
                material: 'Metal dorado y piedras preciosas',
                date: 'Siglo XVIII',
                author: 'Taller de Orfebrería',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfN9S0WWiJ95lfu4UNRBzSnms4j9Pw84G5WwnHxk-ew58PQC6fGMha6NmPuMuiO4t-qAb6sConG5Ln2z1PffIbpyC8WGIsLZqba4StzFvN4APxQPEipy-SC37mgk1ut1USLAMf_JVfGGcowEa6CVVe2R1cvH3JKGXAT6p-e10lfS0L2zNaO45L0MkoAoYOxA68Gq8DComxFB7u2d2lBvsxgeCFGWkQMyBoD63DPEaIIF5HSSZfq8UGKUbrJ0ZEma6-CQSmHd3_t7pG',
                audio: 'custodia-trofeo.mp3'
            },
            // 18: San Bernardo con la Virgen
            {
                folder: 'san-bernardo-con-la-virgen',
                title: 'San Bernardo con la Virgen',
                subtitle: '',
                description: 'San Bernardo en éxtasis contempla la aparición de la Virgen con el Niño, que descienden entre nubes y querubines, en un diálogo místico.',
                typology: 'Madera policromada',
                material: 'Madera policromada',
                date: 'Siglo XVIII (1740)',
                author: 'Luis Salvador Carmona',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfN9S0WWiJ95lfu4UNRBzSnms4j9Pw84G5WwnHxk-ew58PQC6fGMha6NmPuMuiO4t-qAb6sConG5Ln2z1PffIbpyC8WGIsLZqba4StzFvN4APxQPEipy-SC37mgk1ut1USLAMf_JVfGGcowEa6CVVe2R1cvH3JKGXAT6p-e10lfS0L2zNaO45L0MkoAoYOxA68Gq8DComxFB7u2d2lBvsxgeCFGWkQMyBoD63DPEaIIF5HSSZfq8UGKUbrJ0ZEma6-CQSmHd3_t7pG',
                audio: 'san-bernardo-con-la-virgen.mp3'
            },
            // 19: San José con el Niño
            {
                folder: 'san-jose-con-el-nino',
                title: 'San José con el Niño',
                subtitle: '',
                description: 'San José sostiene al Niño en brazos con ternura y gesto protector, en postura frontal, sobre peana con querubines, resaltando la paternidad sagrada.',
                typology: 'Madera Policromada, escuela andaluza con exquisito esmero en la policromía',
                material: 'Madera policromada',
                date: 'Siglo XVIII',
                author: 'Próximo a Luisa Ignacia Roldán Villavicencio \'La Roldana\'',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfN9S0WWiJ95lfu4UNRBzSnms4j9Pw84G5WwnHxk-ew58PQC6fGMha6NmPuMuiO4t-qAb6sConG5Ln2z1PffIbpyC8WGIsLZqba4StzFvN4APxQPEipy-SC37mgk1ut1USLAMf_JVfGGcowEa6CVVe2R1cvH3JKGXAT6p-e10lfS0L2zNaO45L0MkoAoYOxA68Gq8DComxFB7u2d2lBvsxgeCFGWkQMyBoD63DPEaIIF5HSSZfq8UGKUbrJ0ZEma6-CQSmHd3_t7pG',
                audio: 'san-jose-con-el-nino.mp3'
            },
            // 20: Tapiz Histórico
            {
                folder: 'tapiz',
                title: 'Tapiz',
                subtitle: '',
                description: 'Alfombra de gran formato, de estilo oriental con ornamentación floral. Realizado en Cuenca.Gran alfombra de lana con diseño floral y medallón central, inspirada en modelos de Ushak, tejida siguiendo técnica de nudo turco.',
                typology: 'Textil',
                material: 'Lana y seda',
                date: 'Siglo XVI',
                author: 'Manufactura Real',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfN9S0WWiJ95lfu4UNRBzSnms4j9Pw84G5WwnHxk-ew58PQC6fGMha6NmPuMuiO4t-qAb6sConG5Ln2z1PffIbpyC8WGIsLZqba4StzFvN4APxQPEipy-SC37mgk1ut1USLAMf_JVfGGcowEa6CVVe2R1cvH3JKGXAT6p-e10lfS0L2zNaO45L0MkoAoYOxA68Gq8DComxFB7u2d2lBvsxgeCFGWkQMyBoD63DPEaIIF5HSSZfq8UGKUbrJ0ZEma6-CQSmHd3_t7pG',
                audio: 'tapiz.mp3'
            },
            // 21: Virgen de la Asunción
            {
                folder: 'virgen-asuncion',
                title: 'Virgen Inmaculada',
                subtitle: '',
                description: 'La Virgen se eleva al cielo sobre nubes y ángeles niños, con los brazos abiertos y mirada ascendente, representando su Asunción gloriosa.',
                typology: 'Madera Policromada, Escuela Andaluza',
                material: 'Madera policromada',
                date: 'Siglo XVIII',
                author: 'Anónimo',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfN9S0WWiJ95lfu4UNRBzSnms4j9Pw84G5WwnHxk-ew58PQC6fGMha6NmPuMuiO4t-qAb6sConG5Ln2z1PffIbpyC8WGIsLZqba4StzFvN4APxQPEipy-SC37mgk1ut1USLAMf_JVfGGcowEa6CVVe2R1cvH3JKGXAT6p-e10lfS0L2zNaO45L0MkoAoYOxA68Gq8DComxFB7u2d2lBvsxgeCFGWkQMyBoD63DPEaIIF5HSSZfq8UGKUbrJ0ZEma6-CQSmHd3_t7pG',
                audio: 'virgen-asuncion.mp3'
            },
            // 22: Virgen Románica
            {
                folder: 'virgen-romanica',
                title: 'Virgen Románica',
                subtitle: '',
                description: 'Virgen sentada en actitud frontal y majestuosa, coronada, sosteniendo al Niño en su regazo, siguiendo el esquema iconográfico románico.',
                typology: 'Madera Policromada',
                material: 'Madera',
                date: 'Siglo XII (1161)',
                author: 'Anónimo',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfN9S0WWiJ95lfu4UNRBzSnms4j9Pw84G5WwnHxk-ew58PQC6fGMha6NmPuMuiO4t-qAb6sConG5Ln2z1PffIbpyC8WGIsLZqba4StzFvN4APxQPEipy-SC37mgk1ut1USLAMf_JVfGGcowEa6CVVe2R1cvH3JKGXAT6p-e10lfS0L2zNaO45L0MkoAoYOxA68Gq8DComxFB7u2d2lBvsxgeCFGWkQMyBoD63DPEaIIF5HSSZfq8UGKUbrJ0ZEma6-CQSmHd3_t7pG',
                audio: 'virgen-romanica.mp3'
            }
        ];

        // Initialize the app
        this.init();
    }

    saveState() {
        try {
            const state = {
                section: this.currentSection,
                modelIndex: this.currentModelIndex,
                timestamp: new Date().getTime()
            };
            sessionStorage.setItem('museumAppState', JSON.stringify(state));
        } catch (e) {
            console.warn('⚠️ Could not save state to sessionStorage:', e);
        }
    }

    restoreState() {
        // Solo restauramos estado si la pestaña ya estaba activa (mismo contexto)
        // El flag 'museumTabActive' se pone al entrar por la splash screen.
        // Si no está, es una carga nueva → mostrar splash.
        const tabActive = sessionStorage.getItem('museumTabActive');
        if (!tabActive) return false;

        const savedState = sessionStorage.getItem('museumAppState');
        if (savedState) {
            try {
                const state = JSON.parse(savedState);
                const now = new Date().getTime();
                // Valid for 30 minutes of inactivity
                if (now - state.timestamp < 1800000) {
                    console.log('♻️ Restoring state:', state);

                    if (state.section !== 'splash') {
                        // Hide splash immediately
                        const splash = document.getElementById('splash-section');
                        if (splash) {
                            splash.classList.remove('active');
                            splash.style.display = 'none';
                        }

                        document.body.style.overflow = '';
                        document.body.style.height = '';

                        if (state.modelIndex !== -1) {
                            this.currentModelIndex = state.modelIndex;
                            this.openModelDetail(state.modelIndex);
                        } else {
                            this.navigateToSection(state.section);
                        }
                        return true;
                    }
                }
            } catch (e) {
                console.error('Error restoring state:', e);
            }
        }
        return false;
    }

    /** Llamado una sola vez cuando el usuario pulsa "Entrar": activa el flag de pestaña */
    markTabActive() {
        sessionStorage.setItem('museumTabActive', '1');
    }

    playAudio(modelIndex) {
        if (modelIndex < 0 || modelIndex >= this.modelsData.length) return;

        const model = this.modelsData[modelIndex];
        if (!model.audio) {
            alert('Audioguía no disponible para este modelo.');
            return;
        }

        const audioPath = `models/${model.folder}/${model.audio}`;

        // If audio is already playing
        if (this.currentAudio) {
            // Check if it's the same audio
            if (this.currentAudio.src.includes(encodeURI(audioPath)) || this.currentAudio.src.includes(audioPath)) {
                if (!this.currentAudio.paused) {
                    console.log('⏸️ Pausing audio');
                    this.currentAudio.pause();
                    return; // Toggle behavior: pause if playing
                } else {
                    console.log('▶️ Resuming audio');
                    this.currentAudio.play();
                    return;
                }
            } else {
                // Different audio, stop current
                this.stopAudio();
            }
        }

        console.log(`🎵 Playing audio: ${audioPath}`);

        this.currentAudio = new Audio(audioPath);
        this.currentAudio.play().catch(error => {
            console.error('Error playing audio:', error);
            alert('Error al reproducir el audio. Por favor verifique que el archivo existe.');
        });

        // Ensure audio stops when it ends
        this.currentAudio.onended = () => {
            this.currentAudio = null;
        };
    }

    stopAudio() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.currentAudio = null;
        }
    }

    init() {
        console.log('🏛️ Museum App Initialized');
        this.setupEventListeners();
        this.setupGalleryClickHandlers();
        this.setupPanoramaHandler();
        this.setupExploreButtonHandler();
        this.hideInitialGalleryItems();
        this.updateGalleryTitles();
        this.addParallaxEffect();
        this.setupURLRouting();

        const urlPath = window.location.pathname;

        if (urlPath !== '/' && urlPath !== '/index.html') {
            // URL tiene un slug → intentar abrir ese modelo
            const slug = urlPath.replace('/', '');
            this.openModelBySlug(slug);
        } else if (sessionStorage.getItem('museumTabActive')) {
            // La pestaña ya estaba activa (navegación interna / volver atrás)
            // → intentar restaurar el estado anterior
            if (!this.restoreState()) {
                this.navigateToSection('home');
            }
        }
        // else: carga NUEVA de la página (F5, link externo, nueva pestaña)
        // → la splash ya está marcada como 'active' en el HTML, no hacer nada.
    }

    updateGalleryTitles() {
        const galleryItems = document.querySelectorAll('#home-section .grid.grid-cols-2 > .group.relative.flex.flex-col');
        galleryItems.forEach((item, index) => {
            if (item.hasAttribute('data-explore-button') || item.id === 'panorama-slug') return;
            if (this.modelsData && this.modelsData[index]) {
                const titleEl = item.querySelector('h3');
                if (titleEl) {
                    titleEl.textContent = this.modelsData[index].title;
                }
            }
        });
    }

    hideInitialGalleryItems() {
        // Obtener todos los items del grid EXCEPTO panorama-slug y el botón explorar
        // (panorama-slug tiene su propio handler y NUNCA debe ocultarse)
        const allGalleryItems = document.querySelectorAll(
            '#home-section .grid.grid-cols-2 > .group.relative.flex.flex-col:not(#panorama-slug):not([data-explore-button])'
        );
        // Ocultar a partir del item 4 (los 3 modelos visibles + explore btn = 4 primeros)
        const itemsToHide = Array.from(allGalleryItems).slice(3);
        itemsToHide.forEach(item => {
            item.classList.add('hidden');
        });
        console.log(`🙈 Hid ${itemsToHide.length} gallery items initially`);
    }

    setupPanoramaHandler() {
        const panoramaSlug = document.getElementById('panorama-slug');
        if (panoramaSlug) {
            panoramaSlug.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                // ─── iOS: pedir permiso del giroscopio DIRECTAMENTE en el click ───
                // Safari exige que requestPermission() se llame en el mismo stack de
                // eventos del usuario, sin ningún setTimeout ni await intermedio.
                const requestGyroAndOpen = (gyroGranted) => {
                    // Cambiamos la sección ANTES del await para no perder la activación
                    this._navigateSectionImmediate('panorama');
                    history.pushState({ section: 'panorama' }, '', '/HDR');
                    this.openPanorama(gyroGranted);
                };

                if (
                    typeof DeviceOrientationEvent !== 'undefined' &&
                    typeof DeviceOrientationEvent.requestPermission === 'function'
                ) {
                    // iOS Safari — hay que solicitar permiso
                    DeviceOrientationEvent.requestPermission()
                        .then((permission) => {
                            requestGyroAndOpen(permission === 'granted');
                        })
                        .catch((err) => {
                            console.error('Gyro permission error:', err);
                            requestGyroAndOpen(false);
                        });
                } else {
                    // Android / Desktop — no hace falta permiso explícito
                    requestGyroAndOpen(true);
                }
            });
        }

        const closePanoramaBtn = document.getElementById('close-panorama-btn');
        if (closePanoramaBtn) {
            closePanoramaBtn.addEventListener('click', () => {
                // Destruir el visor para liberar sensores
                if (this.panoramaViewer) {
                    try { this.panoramaViewer.destroy(); } catch (e) { }
                    this.panoramaViewer = null;
                }
                history.pushState({ section: 'home' }, '', '/');
                this.navigateToSection('home');
            });
        }
    }

    /** Versión de navigateToSection SIN setTimeout, para preservar la
     *  "User Activation" de iOS al abrir el panorama con giroscopio. */
    _navigateSectionImmediate(sectionName) {
        this.stopAudio();

        const currentSectionEl = document.getElementById(`${this.currentSection}-section`);
        if (currentSectionEl) {
            currentSectionEl.classList.remove('active');
            currentSectionEl.style.zIndex = '0';
        }

        const newSectionEl = document.getElementById(`${sectionName}-section`);
        if (newSectionEl) {
            newSectionEl.classList.add('active');
            newSectionEl.style.zIndex = '50';
            this.currentSection = sectionName;
            this.saveState();

            const globalNav = document.getElementById('global-nav');
            if (globalNav) {
                if (sectionName === 'splash' || sectionName === 'panorama') {
                    globalNav.classList.add('hidden');
                } else {
                    globalNav.classList.remove('hidden');
                }
            }

            if (sectionName !== 'splash') {
                document.body.style.overflow = '';
                document.body.style.height = '';
            }

            this.updateGlobalNavState(sectionName);
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    }

    openPanorama(enableGyro = false) {
        // We are already in the 'panorama' section from the click handler

        // Destruir visor anterior si existe
        if (this.panoramaViewer) {
            try { this.panoramaViewer.destroy(); } catch (e) { }
            this.panoramaViewer = null;
        }

        // Limpiar el contenedor del visor para evitar que pannellum se queje
        const container = document.getElementById('panorama');
        if (container) container.innerHTML = '';

        // Configuración de Pannellum — sin opciones de giroscopio en el config,
        // el giroscopio se activa con startOrientation() tras la carga.
        const config = {
            "type": "equirectangular",
            "panorama": "models/HDR/HDR.jpg",
            "autoLoad": true,
            "autoRotate": 0,
            "showControls": false,
            "hfov": 100,
            "pitch": 0,
            "yaw": 0,
            "maxHfov": 120,
            "minHfov": 60,
            "backgroundColor": [0, 0, 0],
            "crossOrigin": "anonymous",
            "mouseZoom": false,
            "draggable": !enableGyro,   // sin giroscopio dejamos arrastrar con el dedo
            "touchPanSpeedCoeffFront": enableGyro ? 0 : 100
        };

        try {
            this.panoramaViewer = pannellum.viewer('panorama', config);

            this.panoramaViewer.on('load', () => {
                this.panoramaViewer.resize();

                // ── Activar giroscopio con la API oficial de Pannellum ──
                if (enableGyro) {
                    try {
                        this.panoramaViewer.startOrientation();
                        console.log('🧭 Giroscopio activado con startOrientation()');
                    } catch (err) {
                        console.warn('⚠️ startOrientation() falló:', err);
                    }
                } else {
                    console.log('ℹ️ Giroscopio no activado (permiso no concedido o no iOS)');
                }
            });

            this.panoramaViewer.on('error', (err) => {
                console.error('❌ Pannellum error:', err);
            });

        } catch (e) {
            console.error('❌ Failed to init Pannellum:', e);
        }

        // Aseguramos que el loader global se oculte al entrar al panorama
        this.hideLoader();
        console.log(`🌐 Panorama initialized (Gyro: ${enableGyro})`);
    }

    setupEventListeners() {
        // Enter button - Navigate from splash to home
        const enterBtn = document.getElementById('enter-btn');
        if (enterBtn) {
            enterBtn.addEventListener('click', () => {
                // Marcar la pestaña como activa para que restoreState funcione
                // en navegaciones internas (pero no en cargas nuevas de página)
                this.markTabActive();
                this.animateButton(enterBtn);
                this.showLoadingScreen(() => {
                    this.navigateToSection('home');
                }, 2000);
            });
        }

        // Redirect button in Viewer tab
        const startViewerBtn = document.getElementById('start-viewer-btn');
        if (startViewerBtn) {
            startViewerBtn.addEventListener('click', () => {
                this.animateButton(startViewerBtn);
                this.navigateToSection('home');
            });
        }

        // Bottom navigation items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const section = item.getAttribute('data-section');
                this.navigateToSection(section);
                this.updateNavActiveState(item);
            });
        });

        // AR Instructions done button
        const arDoneBtn = document.getElementById('ar-instructions-done-btn');
        if (arDoneBtn) {
            arDoneBtn.addEventListener('click', () => {
                this.animateButton(arDoneBtn);
                this.navigateToSection('home');
            });
        }

        // Menu button (placeholder for future functionality)
        const menuBtn = document.getElementById('menu-btn');
        if (menuBtn) {
            menuBtn.addEventListener('click', () => {
                console.log('Menu clicked - functionality to be implemented');
                // Future: Open side menu or navigation drawer
            });
        }

        // Audio Guide Button
        const audioGuideBtn = document.getElementById('audio-guide-btn');
        if (audioGuideBtn) {
            audioGuideBtn.addEventListener('click', () => {
                this.animateButton(audioGuideBtn);
                this.playAudio(this.currentModelIndex);
            });
        }

        // AR View Button
        const arViewBtn = document.getElementById('ar-view-btn');
        if (arViewBtn) {
            arViewBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.animateButton(arViewBtn);
                const viewer = document.getElementById('3d-viewer');

                if (!viewer) {
                    alert('Error: Visor 3D no encontrado.');
                    return;
                }

                try {
                    const viewer = document.getElementById('3d-viewer');

                    // Aseguramos que el visor intente abrir el AR usando el motor automático estándar. 
                    // Este es el método que funciona correctamente en los otros 20 modelos.
                    console.log('🕶️ Activating Standard AR Mode...');
                    await viewer.activateAR();
                    console.log('✅ AR activated successfully!');
                } catch (error) {
                    console.error('❌ AR activation failed:', error);
                    alert('Error al activar AR: ' + error.message + '\n\nAsegúrate de que:\n1. Estás usando un dispositivo compatible\n2. Has dado permisos de cámara\n3. El modelo 3D se ha cargado completamente');
                }
            });
        }
    }

    showLoadingScreen(onComplete, duration = 2800) {
        const loader = document.getElementById('loading-overlay');
        const progress = document.getElementById('loading-progress');

        if (loader && progress) {
            loader.classList.remove('hidden');
            loader.classList.add('flex');

            // Animate progress bar
            setTimeout(() => {
                progress.style.width = '100%';
                progress.style.transition = `width ${duration - 300}ms cubic-bezier(0.22, 1, 0.36, 1)`;
            }, 50);

            // Execute callback after delay
            setTimeout(() => {
                if (onComplete) onComplete();

                // Hide loader after transition
                setTimeout(() => {
                    loader.classList.add('hidden');
                    loader.classList.remove('flex');
                    progress.style.width = '0';
                    progress.style.transition = 'none';
                }, 500);
            }, duration);
        } else {
            console.warn('⚠️ Loader elements not found');
            if (onComplete) onComplete();
        }
    }

    navigateToSection(sectionName) {
        console.log(`📍 Navigating: ${this.currentSection} → ${sectionName}`);

        try {
            this.stopAudio();

            // Ocultar sección actual
            const currentSectionEl = document.getElementById(`${this.currentSection}-section`);
            if (currentSectionEl) {
                currentSectionEl.classList.remove('active');
                currentSectionEl.style.zIndex = '0';
            }

            // Mostrar nueva sección
            const newSectionEl = document.getElementById(`${sectionName}-section`);
            if (newSectionEl) {
                newSectionEl.classList.add('active');
                newSectionEl.style.zIndex = '50';
                this.currentSection = sectionName;
                this.saveState();

                const globalNav = document.getElementById('global-nav');
                if (globalNav) {
                    if (sectionName === 'splash' || sectionName === 'panorama') {
                        globalNav.classList.add('hidden');
                    } else {
                        globalNav.classList.remove('hidden');
                    }
                }

                if (sectionName !== 'splash') {
                    document.body.style.overflow = '';
                    document.body.style.height = '';
                }

                this.updateGlobalNavState(sectionName);
                window.scrollTo({ top: 0, behavior: 'instant' });
            } else {
                console.error(`❌ Section not found: ${sectionName}-section`);
            }
        } catch (e) {
            console.error('❌ Error in navigateToSection:', e);
        }
    }

    updateGlobalNavState(sectionName) {
        const globalNavItems = document.querySelectorAll('#global-nav .nav-item');
        globalNavItems.forEach(item => {
            const itemSection = item.getAttribute('data-section');
            const icon = item.querySelector('.material-symbols-outlined');
            const text = item.querySelector('span:last-child');

            // Map sub-sections to main nav items
            let activeSection = sectionName;
            if (sectionName === 'model-detail') {
                activeSection = 'viewer';
            }

            if (itemSection === activeSection) {
                // Active state
                item.classList.remove('text-slate-400', 'dark:text-gray-500');
                item.classList.add('text-primary');
                if (icon) icon.classList.add('font-bold');
                if (text) text.classList.add('font-bold');
            } else {
                // Inactive state
                item.classList.remove('text-primary');
                item.classList.add('text-slate-400', 'dark:text-gray-500');
                if (icon) icon.classList.remove('font-bold');
                if (text) text.classList.remove('font-bold');
            }
        });
    }

    updateNavActiveState(activeItem) {
        // Remove active state from all nav items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.remove('text-primary');
            item.classList.add('text-slate-400', 'dark:text-gray-500');

            // Remove bold from text
            const textSpan = item.querySelector('span:last-child');
            if (textSpan) {
                textSpan.classList.remove('font-bold');
            }
        });

        // Add active state to clicked item
        activeItem.classList.remove('text-slate-400', 'dark:text-gray-500');
        activeItem.classList.add('text-primary');

        const textSpan = activeItem.querySelector('span:last-child');
        if (textSpan) {
            textSpan.classList.add('font-bold');
        }
    }

    animateButton(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }

    setupGalleryClickHandlers() {
        // Add click handlers to all gallery items
        const galleryItems = document.querySelectorAll('#home-section .group.relative.flex.flex-col');

        galleryItems.forEach((item, index) => {
            // Skip the explore button and panorama slug
            if (item.hasAttribute('data-explore-button') || item.id === 'panorama-slug') return;

            item.addEventListener('click', () => {
                console.log(`🖼️ Opening model: index ${index}`);
                this.openModelDetail(index, true); // true = update URL
            });
        });

        // Back button handler
        const backBtn = document.getElementById('back-to-home-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                if ((document.referrer && document.referrer.includes('/visualizador')) || sessionStorage.getItem('fromVisualizador') === '1') {
                    sessionStorage.removeItem('fromVisualizador');
                    window.location.href = '/visualizador';
                    return;
                }
                history.pushState({ section: 'home' }, '', '/');
                this.navigateToSection('home');
            });
        }
    }

    setupExploreButtonHandler() {
        // Find the "Explorar Archivo Completo" button using data attribute
        const exploreButton = document.querySelector('[data-explore-button="true"]');

        if (exploreButton) {
            exploreButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // Prevent opening model detail
                this.toggleHiddenGallery();
            });
        }
    }

    toggleHiddenGallery() {
        console.log('🔄 toggleHiddenGallery called!');

        // Get all gallery items
        const allGalleryItems = document.querySelectorAll('#home-section .grid.grid-cols-2 > .group.relative.flex.flex-col');
        console.log(`📦 Total gallery items found: ${allGalleryItems.length}`);

        // Find the explore button
        const exploreButton = document.querySelector('[data-explore-button="true"]');
        const exploreIcon = exploreButton ? exploreButton.querySelector('.material-symbols-outlined') : null;

        // Get items after the explore button (which is now index 4)
        const hiddenItems = Array.from(allGalleryItems).slice(5);
        console.log(`🎯 Hidden items to toggle: ${hiddenItems.length}`);

        if (hiddenItems.length > 0) {
            // Check if items are currently hidden
            const isHidden = hiddenItems[0].classList.contains('hidden');
            console.log(`Current state: ${isHidden ? 'hidden' : 'visible'}`);

            if (isHidden) {
                // Show hidden items
                hiddenItems.forEach(item => {
                    item.classList.remove('hidden');
                });

                // Hide the explore button since all items are now visible
                if (exploreButton) {
                    exploreButton.classList.add('hidden');
                }

                // Rotate icon to indicate expanded state
                if (exploreIcon) {
                    exploreIcon.style.transform = 'rotate(45deg)';
                }

                console.log('📂 Expanded gallery - showing 18 more items');
            } else {
                // Hide items
                hiddenItems.forEach(item => {
                    item.classList.add('hidden');
                });

                // Reset icon rotation
                if (exploreIcon) {
                    exploreIcon.style.transform = 'rotate(0deg)';
                }

                console.log('📁 Collapsed gallery - hiding extra items');
            }
        } else {
            console.warn('⚠️ No hidden items found!');
        }
    }

    openModelDetail(modelIndex, updateURL = false) {
        console.log(`🔍 openModelDetail: indexRequested=${modelIndex}, currentSection=${this.currentSection}`);
        this.currentModelIndex = modelIndex;
        this.saveState(); // Save state when opening model

        // Update URL if requested
        if (updateURL && this.modelsData[modelIndex]) {
            const slug = this.modelsData[modelIndex].folder;
            history.pushState({ modelIndex: modelIndex }, '', `/${slug}`);
            console.log(`📍 URL updated to: /${slug} (Index: ${modelIndex})`);
        }

        // Base path for models
        const basePath = 'models';

        // Define all models in order matching grid indices 0-21
        // Index 3 is the explore button/placeholder, so it's null
        // Use class-level modelsData
        const modelsData = this.modelsData;

        // Ensure index is valid
        if (modelIndex < 0 || modelIndex >= modelsData.length || !modelsData[modelIndex]) {
            console.warn(`⚠️ Invalid model index: ${modelIndex}`);
            return;
        }

        const data = modelsData[modelIndex];
        console.log(`📦 Loading model: ${data.folder} from index ${modelIndex}`);

        // Handle panorama type — redirigir al home, el panorama siempre
        // se abre desde el click en la galería (con permiso del giroscopio).
        if (data && data.type === 'panorama') {
            // Si viene de URL restoration, navegamos a home para que el usuario
            // haga click en la galería y obtenga el permiso del giroscopio.
            this.navigateToSection('home');
            return;
        }


        // Construct paths
        const glbPath = `${basePath}/${data.folder}/${data.folder}.glb`; // e.g., models/Bayeu-Inmaculada/Bayeu-Inmaculada.glb
        const posterImage = data.image ? data.image : ''; // No fallback image, just empty string

        // Update Text Content
        const titleEl = document.getElementById('model-title');
        const subtitleEl = document.getElementById('model-subtitle');
        const descriptionEl = document.getElementById('model-description');
        const imageEl = document.getElementById('model-image');

        // New Metadata Elements
        const typologyEl = document.getElementById('model-typology');
        const materialEl = document.getElementById('model-material');
        const dateEl = document.getElementById('model-date');
        const authorEl = document.getElementById('model-author');

        if (titleEl) titleEl.textContent = data.title;
        if (subtitleEl) subtitleEl.textContent = data.subtitle;
        if (descriptionEl) descriptionEl.textContent = data.description || '';

        // Update Metadata Fields
        if (typologyEl) typologyEl.textContent = data.typology || '-';
        if (materialEl) materialEl.textContent = data.material || '-';
        if (dateEl) dateEl.textContent = data.date || '-';
        if (authorEl) authorEl.textContent = data.author || '-';

        // Update 3D Viewer
        const viewer = document.getElementById('3d-viewer');
        if (viewer) {
            // ── AR en iOS ──
            // Usamos generación dinámica desde el GLB. El model-viewer
            // convierte internamente a USDZ para Quick Look en iOS.
            // NO usamos ios-src para evitar archivos USDZ rotos o LFS.
            viewer.removeAttribute('ios-src');

            // Poster: muestra la imagen del modelo mientras el GLB (pesado) descarga.
            // Sin poster el visor aparece negro y parece que no carga.
            // Primero intentamos el WebP local; si no existe, usamos data.image (URL externa).
            const localWebp = `models/${data.folder}/${data.folder}.webp`;
            const posterUrl = data.image || localWebp;
            viewer.setAttribute('poster', posterUrl);

            // Asignar el GLB
            viewer.src = glbPath;
            viewer.alt = data.title || '3D Model';

            console.log(`📦 GLB: ${glbPath} | Poster: ${posterUrl}`);

            viewer.addEventListener('load', () => {
                console.log('✅ Modelo cargado. canActivateAR:', viewer.canActivateAR);
                // Quitar el poster una vez cargado el modelo 3D
                viewer.removeAttribute('poster');
            }, { once: true });
        }

        // Navigate to section
        this.navigateToSection('model-detail');
    }

    addParallaxEffect() {
        // Subtle parallax effect on splash screen background
        document.addEventListener('mousemove', (e) => {
            if (this.currentSection === 'splash') {
                const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
                const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

                const bgElement = document.querySelector('.museum-texture');
                if (bgElement) {
                    bgElement.style.transform = `translate(${moveX}px, ${moveY}px)`;
                }
            }
        });
    }

    // Utility method for future use
    showLoader() {
        console.log('⏳ Loading...');
        // Future: Show loading animation
    }

    hideLoader() {
        console.log('✅ Loaded');
        // Future: Hide loading animation
    }

    preloadModels() {
        console.log('🚀 Starting background model preloading...');

        // Get unique GLB paths
        const modelsToLoad = this.modelsData
            .filter(model => model && model.folder) // Filter out nulls/empty
            .map(model => `models/${model.folder}/${model.folder}.glb`);

        // Deduplicate
        const uniquePaths = [...new Set(modelsToLoad)];

        console.log(`📦 Found ${uniquePaths.length} models to preload`);

        // Load sequentially to avoid network congestion
        this.loadNextModel(uniquePaths, 0);
    }

    loadNextModel(paths, index) {
        if (index >= paths.length) {
            console.log('✨ All models preloaded successfully!');
            return;
        }

        const path = paths[index];
        // Use the base path directly to allow caching
        const url = path;

        fetch(url, { priority: 'low' }) // Low priority fetch if supported
            .then(response => {
                if (response.ok) {
                    console.log(`✅ Preloaded (${index + 1}/${paths.length}): ${path}`);
                } else {
                    console.warn(`⚠️ Failed to preload: ${path} (${response.status})`);
                }
            })
            .catch(err => {
                console.warn(`❌ Error preloading ${path}:`, err);
            })
            .finally(() => {
                // Continue to next model regardless of success/fail
                this.loadNextModel(paths, index + 1);
            });
    }

    setupURLRouting() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            const urlPath = window.location.pathname;

            if (urlPath === '/' || urlPath === '/index.html') {
                // Back to home
                this.navigateToSection('home');
            } else {
                // Navigate to model from URL
                const slug = urlPath.replace('/', '');
                this.openModelBySlug(slug, false); // false = don't update URL again
            }
        });
    }

    openModelBySlug(slug, updateURL = false) {
        // Find model index by folder name (slug)
        const modelIndex = this.modelsData.findIndex(model =>
            model && model.folder === slug
        );

        if (modelIndex !== -1) {
            console.log(`🔗 Opening model from URL: ${slug} (index: ${modelIndex})`);
            this.openModelDetail(modelIndex, updateURL);
        } else {
            console.warn(`⚠️ Model not found for slug: ${slug}`);
            // Redirect to home if model not found
            history.replaceState({}, '', '/');
            this.navigateToSection('home');
        }
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.museumApp = new MuseumApp();
});
