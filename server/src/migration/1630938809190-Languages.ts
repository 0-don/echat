import { MigrationInterface, QueryRunner } from 'typeorm';

export class Languages1630938809190 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO language(id,name,code) VALUES (1,'Afar','aa');
        INSERT INTO language(id,name,code) VALUES (2,'Abkhazian','ab');
        INSERT INTO language(id,name,code) VALUES (3,'Avestan','ae');
        INSERT INTO language(id,name,code) VALUES (4,'Afrikaans','af');
        INSERT INTO language(id,name,code) VALUES (5,'Akan','ak');
        INSERT INTO language(id,name,code) VALUES (6,'Amharic','am');
        INSERT INTO language(id,name,code) VALUES (7,'Aragonese','an');
        INSERT INTO language(id,name,code) VALUES (8,'Arabic','ar');
        INSERT INTO language(id,name,code) VALUES (9,'Assamese','as');
        INSERT INTO language(id,name,code) VALUES (10,'Avaric','av');
        INSERT INTO language(id,name,code) VALUES (11,'Aymara','ay');
        INSERT INTO language(id,name,code) VALUES (12,'Azerbaijani','az');
        INSERT INTO language(id,name,code) VALUES (13,'Bashkir','ba');
        INSERT INTO language(id,name,code) VALUES (14,'Belarusian','be');
        INSERT INTO language(id,name,code) VALUES (15,'Bulgarian','bg');
        INSERT INTO language(id,name,code) VALUES (16,'Bihari','bh');
        INSERT INTO language(id,name,code) VALUES (17,'Bislama','bi');
        INSERT INTO language(id,name,code) VALUES (18,'Bambara','bm');
        INSERT INTO language(id,name,code) VALUES (19,'Bengali','bn');
        INSERT INTO language(id,name,code) VALUES (20,'Tibetan','bo');
        INSERT INTO language(id,name,code) VALUES (21,'Breton','br');
        INSERT INTO language(id,name,code) VALUES (22,'Bosnian','bs');
        INSERT INTO language(id,name,code) VALUES (23,'Catalan','ca');
        INSERT INTO language(id,name,code) VALUES (24,'Chechen','ce');
        INSERT INTO language(id,name,code) VALUES (25,'Chamorro','ch');
        INSERT INTO language(id,name,code) VALUES (26,'Corsican','co');
        INSERT INTO language(id,name,code) VALUES (27,'Cree','cr');
        INSERT INTO language(id,name,code) VALUES (28,'Czech','cs');
        INSERT INTO language(id,name,code) VALUES (29,'Church Slavic;','cu');
        INSERT INTO language(id,name,code) VALUES (30,'Chuvash','cv');
        INSERT INTO language(id,name,code) VALUES (31,'Welsh','cy');
        INSERT INTO language(id,name,code) VALUES (32,'Danish','da');
        INSERT INTO language(id,name,code) VALUES (33,'German','de');
        INSERT INTO language(id,name,code) VALUES (34,'Divehi','dv');
        INSERT INTO language(id,name,code) VALUES (35,'Dzongkha','dz');
        INSERT INTO language(id,name,code) VALUES (36,'Ewe','ee');
        INSERT INTO language(id,name,code) VALUES (37,'Greek','el');
        INSERT INTO language(id,name,code) VALUES (38,'English','en');
        INSERT INTO language(id,name,code) VALUES (39,'Esperanto','eo');
        INSERT INTO language(id,name,code) VALUES (40,'Spanish','es');
        INSERT INTO language(id,name,code) VALUES (41,'Estonian','et');
        INSERT INTO language(id,name,code) VALUES (42,'Basque','eu');
        INSERT INTO language(id,name,code) VALUES (43,'Persian','fa');
        INSERT INTO language(id,name,code) VALUES (44,'Fulah','ff');
        INSERT INTO language(id,name,code) VALUES (45,'Finnish','fi');
        INSERT INTO language(id,name,code) VALUES (46,'Fijian','fj');
        INSERT INTO language(id,name,code) VALUES (47,'Faroese','fo');
        INSERT INTO language(id,name,code) VALUES (48,'French','fr');
        INSERT INTO language(id,name,code) VALUES (49,'Western Frisian','fy');
        INSERT INTO language(id,name,code) VALUES (50,'Irish','ga');
        INSERT INTO language(id,name,code) VALUES (51,'Gaelic','gd');
        INSERT INTO language(id,name,code) VALUES (52,'Galician','gl');
        INSERT INTO language(id,name,code) VALUES (53,'Guarani','gn');
        INSERT INTO language(id,name,code) VALUES (54,'Gujarati','gu');
        INSERT INTO language(id,name,code) VALUES (55,'Manx','gv');
        INSERT INTO language(id,name,code) VALUES (56,'Hausa','ha');
        INSERT INTO language(id,name,code) VALUES (57,'Hebrew','he');
        INSERT INTO language(id,name,code) VALUES (58,'Hindi','hi');
        INSERT INTO language(id,name,code) VALUES (59,'Hiri Motu','ho');
        INSERT INTO language(id,name,code) VALUES (60,'Croatian','hr');
        INSERT INTO language(id,name,code) VALUES (61,'Haitian','ht');
        INSERT INTO language(id,name,code) VALUES (62,'Hungarian','hu');
        INSERT INTO language(id,name,code) VALUES (63,'Armenian','hy');
        INSERT INTO language(id,name,code) VALUES (64,'Herero','hz');
        INSERT INTO language(id,name,code) VALUES (65,'Interlingua','ia');
        INSERT INTO language(id,name,code) VALUES (66,'Indonesian','id');
        INSERT INTO language(id,name,code) VALUES (67,'Interlingue','ie');
        INSERT INTO language(id,name,code) VALUES (68,'Igbo','ig');
        INSERT INTO language(id,name,code) VALUES (69,'Sichuan Yi','ii');
        INSERT INTO language(id,name,code) VALUES (70,'Inupiaq','ik');
        INSERT INTO language(id,name,code) VALUES (71,'Ido','io');
        INSERT INTO language(id,name,code) VALUES (72,'Icelandic','is');
        INSERT INTO language(id,name,code) VALUES (73,'Italian','it');
        INSERT INTO language(id,name,code) VALUES (74,'Inuktitut','iu');
        INSERT INTO language(id,name,code) VALUES (75,'Japanese','ja');
        INSERT INTO language(id,name,code) VALUES (76,'Javanese','jv');
        INSERT INTO language(id,name,code) VALUES (77,'Georgian','ka');
        INSERT INTO language(id,name,code) VALUES (78,'Kongo','kg');
        INSERT INTO language(id,name,code) VALUES (79,'Kikuyu','ki');
        INSERT INTO language(id,name,code) VALUES (80,'Kuanyama','kj');
        INSERT INTO language(id,name,code) VALUES (81,'Kazakh','kk');
        INSERT INTO language(id,name,code) VALUES (82,'Kalaallisut','kl');
        INSERT INTO language(id,name,code) VALUES (83,'Central Khmer','km');
        INSERT INTO language(id,name,code) VALUES (84,'Kannada','kn');
        INSERT INTO language(id,name,code) VALUES (85,'Korean','ko');
        INSERT INTO language(id,name,code) VALUES (86,'Kanuri','kr');
        INSERT INTO language(id,name,code) VALUES (87,'Kashmiri','ks');
        INSERT INTO language(id,name,code) VALUES (88,'Kurdish','ku');
        INSERT INTO language(id,name,code) VALUES (89,'Komi','kv');
        INSERT INTO language(id,name,code) VALUES (90,'Cornish','kw');
        INSERT INTO language(id,name,code) VALUES (91,'Kirghiz','ky');
        INSERT INTO language(id,name,code) VALUES (92,'Latin','la');
        INSERT INTO language(id,name,code) VALUES (93,'Luxembourgish','lb');
        INSERT INTO language(id,name,code) VALUES (94,'Ganda','lg');
        INSERT INTO language(id,name,code) VALUES (95,'Limburgan;','li');
        INSERT INTO language(id,name,code) VALUES (96,'Lingala','ln');
        INSERT INTO language(id,name,code) VALUES (97,'Lao','lo');
        INSERT INTO language(id,name,code) VALUES (98,'Lithuanian','lt');
        INSERT INTO language(id,name,code) VALUES (99,'Luba-Katanga','lu');
        INSERT INTO language(id,name,code) VALUES (100,'Latvian','lv');
        INSERT INTO language(id,name,code) VALUES (101,'Malagasy','mg');
        INSERT INTO language(id,name,code) VALUES (102,'Marshallese','mh');
        INSERT INTO language(id,name,code) VALUES (103,'Maori','mi');
        INSERT INTO language(id,name,code) VALUES (104,'Macedonian','mk');
        INSERT INTO language(id,name,code) VALUES (105,'Malayalam','ml');
        INSERT INTO language(id,name,code) VALUES (106,'Mongolian','mn');
        INSERT INTO language(id,name,code) VALUES (107,'Marathi','mr');
        INSERT INTO language(id,name,code) VALUES (108,'Malay','ms');
        INSERT INTO language(id,name,code) VALUES (109,'Maltese','mt');
        INSERT INTO language(id,name,code) VALUES (110,'Burmese','my');
        INSERT INTO language(id,name,code) VALUES (111,'Nauru','na');
        INSERT INTO language(id,name,code) VALUES (112,'Norwegian','nb');
        INSERT INTO language(id,name,code) VALUES (113,'North Ndebele','nd');
        INSERT INTO language(id,name,code) VALUES (114,'Nepali','ne');
        INSERT INTO language(id,name,code) VALUES (115,'Ndonga','ng');
        INSERT INTO language(id,name,code) VALUES (116,'Dutch; Flemish','nl');
        INSERT INTO language(id,name,code) VALUES (117,'Norwegian Nynorsk;','nn');
        INSERT INTO language(id,name,code) VALUES (118,'Norwegian','no');
        INSERT INTO language(id,name,code) VALUES (119,'South Ndebele','nr');
        INSERT INTO language(id,name,code) VALUES (120,'Navajo','nv');
        INSERT INTO language(id,name,code) VALUES (121,'Chichewa','ny');
        INSERT INTO language(id,name,code) VALUES (122,'Occitan','oc');
        INSERT INTO language(id,name,code) VALUES (123,'Ojibwa','oj');
        INSERT INTO language(id,name,code) VALUES (124,'Oromo','om');
        INSERT INTO language(id,name,code) VALUES (125,'Oriya','or');
        INSERT INTO language(id,name,code) VALUES (126,'Ossetian','os');
        INSERT INTO language(id,name,code) VALUES (127,'Panjabi','pa');
        INSERT INTO language(id,name,code) VALUES (128,'Pali','pi');
        INSERT INTO language(id,name,code) VALUES (129,'Polish','pl');
        INSERT INTO language(id,name,code) VALUES (130,'Pushto;','ps');
        INSERT INTO language(id,name,code) VALUES (131,'Portuguese','pt');
        INSERT INTO language(id,name,code) VALUES (132,'Quechua','qu');
        INSERT INTO language(id,name,code) VALUES (133,'Romansh','rm');
        INSERT INTO language(id,name,code) VALUES (134,'Rundi','rn');
        INSERT INTO language(id,name,code) VALUES (135,'Romanian','ro');
        INSERT INTO language(id,name,code) VALUES (136,'Russian','ru');
        INSERT INTO language(id,name,code) VALUES (137,'Kinyarwanda','rw');
        INSERT INTO language(id,name,code) VALUES (138,'Sanskrit','sa');
        INSERT INTO language(id,name,code) VALUES (139,'Sardinian','sc');
        INSERT INTO language(id,name,code) VALUES (140,'Sindhi','sd');
        INSERT INTO language(id,name,code) VALUES (141,'Northern Sami','se');
        INSERT INTO language(id,name,code) VALUES (142,'Sango','sg');
        INSERT INTO language(id,name,code) VALUES (143,'Sinhala','si');
        INSERT INTO language(id,name,code) VALUES (144,'Slovak','sk');
        INSERT INTO language(id,name,code) VALUES (145,'Slovenian','sl');
        INSERT INTO language(id,name,code) VALUES (146,'Samoan','sm');
        INSERT INTO language(id,name,code) VALUES (147,'Shona','sn');
        INSERT INTO language(id,name,code) VALUES (148,'Somali','so');
        INSERT INTO language(id,name,code) VALUES (149,'Albanian','sq');
        INSERT INTO language(id,name,code) VALUES (150,'Serbian','sr');
        INSERT INTO language(id,name,code) VALUES (151,'Swati','ss');
        INSERT INTO language(id,name,code) VALUES (152,'Sotho','st');
        INSERT INTO language(id,name,code) VALUES (153,'Sundanese','su');
        INSERT INTO language(id,name,code) VALUES (154,'Swedish','sv');
        INSERT INTO language(id,name,code) VALUES (155,'Swahili','sw');
        INSERT INTO language(id,name,code) VALUES (156,'Tamil','ta');
        INSERT INTO language(id,name,code) VALUES (157,'Telugu','te');
        INSERT INTO language(id,name,code) VALUES (158,'Tajik','tg');
        INSERT INTO language(id,name,code) VALUES (159,'Thai','th');
        INSERT INTO language(id,name,code) VALUES (160,'Tigrinya','ti');
        INSERT INTO language(id,name,code) VALUES (161,'Turkmen','tk');
        INSERT INTO language(id,name,code) VALUES (162,'Tagalog','tl');
        INSERT INTO language(id,name,code) VALUES (163,'Tswana','tn');
        INSERT INTO language(id,name,code) VALUES (164,'Tonga','to');
        INSERT INTO language(id,name,code) VALUES (165,'Turkish','tr');
        INSERT INTO language(id,name,code) VALUES (166,'Tsonga','ts');
        INSERT INTO language(id,name,code) VALUES (167,'Tatar','tt');
        INSERT INTO language(id,name,code) VALUES (168,'Twi','tw');
        INSERT INTO language(id,name,code) VALUES (169,'Tahitian','ty');
        INSERT INTO language(id,name,code) VALUES (170,'Uighur','ug');
        INSERT INTO language(id,name,code) VALUES (171,'Ukrainian','uk');
        INSERT INTO language(id,name,code) VALUES (172,'Urdu','ur');
        INSERT INTO language(id,name,code) VALUES (173,'Uzbek','uz');
        INSERT INTO language(id,name,code) VALUES (174,'Venda','ve');
        INSERT INTO language(id,name,code) VALUES (175,'Vietnamese','vi');
        INSERT INTO language(id,name,code) VALUES (176,'Volapük','vo');
        INSERT INTO language(id,name,code) VALUES (177,'Walloon','wa');
        INSERT INTO language(id,name,code) VALUES (178,'Wolof','wo');
        INSERT INTO language(id,name,code) VALUES (179,'Xhosa','xh');
        INSERT INTO language(id,name,code) VALUES (180,'Yiddish','yi');
        INSERT INTO language(id,name,code) VALUES (181,'Yoruba','yo');
        INSERT INTO language(id,name,code) VALUES (182,'Zhuang','za');
        INSERT INTO language(id,name,code) VALUES (183,'Chinese','zh');
        INSERT INTO language(id,name,code) VALUES (184,'Zulu','zu');
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM country;
        `);
  }
}
