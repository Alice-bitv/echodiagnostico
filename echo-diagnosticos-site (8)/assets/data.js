/* =========================================================================
   DADOS DA ECHO DIAGNÓSTICOS
   Este é o ÚNICO arquivo que precisa ser editado quando um preço,
   horário ou item da tabela mudar. Todas as páginas do site leem
   estes mesmos dados — editar aqui atualiza o site inteiro.

   Como editar um preço:
   Encontre o exame na lista EXAMS abaixo e troque o número de "club"
   ou "normal". Use "null" (sem aspas) quando não houver preço Club Echo.
   ========================================================================= */

const WHATSAPP_NUMBER = "5521998580049"; // WhatsApp confirmado
const PHONE_DISPLAY = "(21) 3333-7722"; // telefone fixo confirmado
const WHATSAPP_DISPLAY = "(21) 99858-0049";
const CLINIC_ADDRESS = "Rua Silva Cardoso, nº 555 — Bangu, Rio de Janeiro - RJ";

const UNIT_2 = {
  name: "Echo Diagnósticos — Unidade 2",
  address: "Rua Silva Cardoso, nº 405, Loja D — Bangu, Rio de Janeiro - RJ",
  specialties: ["Nutricionista", "Pediatra", "Dermatologista"]
};

const FREE_EXAMS_PROMO = {
  title: "4 exames grátis para o titular",
  desc: "Pagando os 12 meses do Club Echo adiantado, via PIX ou crédito, por R$ 358,80",
  items: ["Densitometria óssea", "Eletrocardiograma", "Hemograma completo", "Mamografia"]
};

/* Slug = identificador único usado nas buscas e âncoras (não usar espaços/acentos) */
const EXAMS = [
  {slug:"usg-abdome-refluxo", name:"Abdome total — pesquisa de refluxo", cat:"Ultrassonografia", club:239, normal:275, note:"", schedule:true},
  {slug:"usg-abdome-superior", name:"Abdome superior", cat:"Ultrassonografia", club:85, normal:110, note:"", schedule:true},
  {slug:"usg-abdome-total", name:"Ultrassom abdome total", cat:"Ultrassonografia", club:79, normal:135, note:"Exige preparo", schedule:true},
  {slug:"usg-aparelho-urinario", name:"Aparelho urinário", cat:"Ultrassonografia", club:71, normal:85, note:"", schedule:true},
  {slug:"usg-articulacao", name:"Articulação", cat:"Ultrassonografia", club:89, normal:99, note:"Valor por articulação", schedule:true},
  {slug:"usg-axila", name:"Axila", cat:"Ultrassonografia", club:44, normal:69, note:"Valor por axila", schedule:true},
  {slug:"usg-mamaria", name:"Ultrassom mamária bilateral", cat:"Ultrassonografia", club:79, normal:145, note:"Trazer mamografia e/ou USG mamária anterior", schedule:true},
  {slug:"usg-musculo-esqueletico", name:"Músculo esquelético", cat:"Ultrassonografia", club:79, normal:98, note:"Valor por músculo", schedule:true},
  {slug:"usg-obstetrica-1trim", name:"Obstétrica 1º trimestre", cat:"Ultrassonografia", club:59, normal:89, note:"", schedule:true},
  {slug:"usg-obstetrica", name:"Ultrassonografia obstétrica", cat:"Ultrassonografia", club:59, normal:89, note:"", schedule:true},
  {slug:"translucencia-nucal", name:"Ultrassonografia de translucência nucal", cat:"Ultrassonografia", club:79, normal:110, note:"", schedule:true},
  {slug:"usg-morfologica", name:"Ultrassonografia morfológica", cat:"Ultrassonografia", club:139, normal:250, note:"", schedule:true},
  {slug:"usg-parede-abdominal", name:"Parede abdominal", cat:"Ultrassonografia", club:89, normal:110, note:"", schedule:true},
  {slug:"usg-partes-moles", name:"Partes moles", cat:"Ultrassonografia", club:76, normal:94, note:"Valor por região", schedule:true},
  {slug:"usg-pelvica", name:"Pélvica", cat:"Ultrassonografia", club:65, normal:89, note:"", schedule:true},
  {slug:"usg-prostata-abdominal", name:"Próstata via abdominal", cat:"Ultrassonografia", club:69, normal:110, note:"", schedule:true},
  {slug:"usg-prostata-transretal", name:"Próstata via transretal", cat:"Ultrassonografia", club:86, normal:115, note:"", schedule:true},
  {slug:"usg-quadril", name:"Quadril", cat:"Ultrassonografia", club:89, normal:150, note:"Valor por lado", schedule:true},
  {slug:"usg-regiao-cervical", name:"Região cervical", cat:"Ultrassonografia", club:89, normal:110, note:"", schedule:true},
  {slug:"usg-regiao-inguinal", name:"Região inguinal", cat:"Ultrassonografia", club:79, normal:115, note:"Valor por lado", schedule:true},
  {slug:"usg-tireoide", name:"Tireóide", cat:"Ultrassonografia", club:76, normal:94, card:136, note:"", schedule:true},
  {slug:"usg-transvaginal", name:"Ultrassom transvaginal", cat:"Ultrassonografia", club:59, normal:89, card:129, note:"", schedule:true},

  {slug:"usg-abdome-superior-doppler", name:"Abdome superior com Doppler", cat:"Ultrassonografia com Doppler", club:115, normal:158, card:230, note:"", schedule:true},
  {slug:"usg-abdome-total-doppler", name:"Abdome total com Doppler", cat:"Ultrassonografia com Doppler", club:175, normal:255, card:369, note:"Exige preparo", schedule:true},
  {slug:"usg-arterias-renais-doppler", name:"Artérias renais com Doppler", cat:"Ultrassonografia com Doppler", club:252, normal:290, card:420, note:"Exige preparo", schedule:true},
  {slug:"usg-aparelho-urinario-doppler", name:"Aparelho urinário com Doppler", cat:"Ultrassonografia com Doppler", club:108, normal:130, card:188, note:"", schedule:true},
  {slug:"usg-articulacao-doppler", name:"Articulação com Doppler", cat:"Ultrassonografia com Doppler", club:108, normal:130, card:188, note:"Valor por articulação", schedule:true},
  {slug:"usg-axila-doppler", name:"Axila com Doppler", cat:"Ultrassonografia com Doppler", club:58, normal:85, card:123, note:"Valor por lado", schedule:true},
  {slug:"usg-bolsa-escrotal-doppler", name:"Bolsa escrotal com Doppler", cat:"Ultrassonografia com Doppler", club:99, normal:130, card:174, note:"", schedule:true},
  {slug:"eco-fetal-doppler", name:"Ecocardiograma fetal com Doppler", cat:"Ultrassonografia com Doppler", club:169, normal:240, card:348, note:"", schedule:true},
  {slug:"usg-mamaria-doppler", name:"Mama bilateral com Doppler", cat:"Ultrassonografia com Doppler", club:82, normal:175, card:253, note:"", schedule:true},
  {slug:"usg-obstetrica-doppler", name:"Obstétrica com Doppler", cat:"Ultrassonografia com Doppler", club:108, normal:150, card:217, note:"", schedule:true},
  {slug:"translucencia-nucal-doppler", name:"Obstétrica translucência nucal com Doppler", cat:"Ultrassonografia com Doppler", club:99, normal:140, card:203, note:"", schedule:true},
  {slug:"usg-morfologica-doppler", name:"Obstétrica morfológica com Doppler", cat:"Ultrassonografia com Doppler", club:184, normal:280, card:406, note:"", schedule:true},
  {slug:"usg-partes-moles-doppler", name:"Partes moles com Doppler", cat:"Ultrassonografia com Doppler", club:99, normal:140, card:203, note:"", schedule:true},
  {slug:"usg-pelvica-doppler", name:"Pélvica com Doppler", cat:"Ultrassonografia com Doppler", club:85, normal:120, card:174, note:"", schedule:true},
  {slug:"usg-penis-doppler", name:"Pênis com Doppler", cat:"Ultrassonografia com Doppler", club:90, normal:140, card:203, note:"", schedule:true},
  {slug:"usg-prostata-doppler", name:"Próstata via abdominal ou transretal com Doppler", cat:"Ultrassonografia com Doppler", club:108, normal:130, card:188, note:"", schedule:true},
  {slug:"usg-quadril-doppler", name:"Quadril com Doppler", cat:"Ultrassonografia com Doppler", club:112, normal:175, card:253, note:"Valor por lado", schedule:true},
  {slug:"usg-regiao-cervical-doppler", name:"Região cervical com Doppler", cat:"Ultrassonografia com Doppler", club:90, normal:110, card:160, note:"", schedule:true},
  {slug:"usg-regiao-inguinal-doppler", name:"Região inguinal com Doppler", cat:"Ultrassonografia com Doppler", club:99, normal:120, card:174, note:"Valor por lado", schedule:true},
  {slug:"usg-tireoide-doppler", name:"Tireóide com Doppler", cat:"Ultrassonografia com Doppler", club:89, normal:125, card:181, note:"", schedule:true},
  {slug:"usg-transvaginal-doppler", name:"Transvaginal com Doppler", cat:"Ultrassonografia com Doppler", club:120, normal:150, card:217, note:"", schedule:true},
  {slug:"usg-transfontanela-doppler", name:"Transfontanela com Doppler", cat:"Ultrassonografia com Doppler", club:157, normal:195, card:283, note:"", schedule:true},

  {slug:"densitometria", name:"Densitometria óssea", cat:"Raio-X Médico e Odontológico", club:39, normal:89, card:129, note:"Fêmur e coluna", schedule:true},
  {slug:"mamografia", name:"Mamografia", cat:"Raio-X Médico e Odontológico", club:49, normal:99, card:129, note:"De segunda a sábado, não precisa agendar", schedule:false},
  {slug:"rx-bacia", name:"Raio-X bacia — AP", cat:"Raio-X Médico e Odontológico", club:52, normal:58, card:85, note:"Não precisa agendar", schedule:false},
  {slug:"rx-cavum", name:"Raio-X cávum — AP e perfil", cat:"Raio-X Médico e Odontológico", club:62, normal:69, card:101, note:"Não precisa agendar", schedule:false},
  {slug:"rx-coluna-cervical", name:"Raio-X coluna cervical — AP e axial", cat:"Raio-X Médico e Odontológico", club:58, normal:65, card:95, note:"Não precisa agendar", schedule:false},
  {slug:"rx-coluna-dorsal", name:"Raio-X coluna dorsal (torácica) — AP e perfil", cat:"Raio-X Médico e Odontológico", club:61, normal:68, card:99, note:"Não precisa agendar", schedule:false},
  {slug:"rx-lombar", name:"Raio-X coluna lombar AP e perfil", cat:"Raio-X Médico e Odontológico", club:0, normal:79, card:115, note:"Grátis com Club Echo · Não precisa agendar", schedule:false},
  {slug:"rx-lombossacra", name:"Raio-X lombossacra — AP e perfil", cat:"Raio-X Médico e Odontológico", club:62, normal:69, card:101, note:"Não precisa agendar", schedule:false},
  {slug:"rx-joelho", name:"Raio-X de joelho AP e perfil", cat:"Raio-X Médico e Odontológico", club:39, normal:79, card:115, note:"Valor por membro · Não precisa agendar", schedule:false},
  {slug:"rx-mao", name:"Raio-X mão — AP e oblíqua", cat:"Raio-X Médico e Odontológico", club:62, normal:69, card:101, note:"Valor por membro · Não precisa agendar", schedule:false},
  {slug:"rx-idade-ossea", name:"Raio-X mãos e punhos para idade óssea", cat:"Raio-X Médico e Odontológico", club:67, normal:75, card:109, note:"Não precisa agendar", schedule:false},
  {slug:"rx-ombro", name:"Raio-X ombro — AP", cat:"Raio-X Médico e Odontológico", club:62, normal:69, card:101, note:"Valor por membro · Não precisa agendar", schedule:false},
  {slug:"rx-panoramico-coluna", name:"Raio-X panorâmico da coluna", cat:"Raio-X Médico e Odontológico", club:185, normal:245, card:355, note:"Não precisa agendar", schedule:false},
  {slug:"rx-pe", name:"Raio-X pé — AP e oblíquo", cat:"Raio-X Médico e Odontológico", club:62, normal:69, card:101, note:"Valor por membro · Não precisa agendar", schedule:false},
  {slug:"rx-punho", name:"Raio-X punho", cat:"Raio-X Médico e Odontológico", club:61, normal:68, card:99, note:"Valor por membro · Não precisa agendar", schedule:false},
  {slug:"rx-quadril", name:"Raio-X quadril — AP e perfil", cat:"Raio-X Médico e Odontológico", club:62, normal:69, card:101, note:"Valor por lado · Não precisa agendar", schedule:false},
  {slug:"rx-seios-face", name:"Raio-X seios da face", cat:"Raio-X Médico e Odontológico", club:67, normal:75, card:109, note:"Frontonaso e mentonaso · Não precisa agendar", schedule:false},
  {slug:"rx-torax", name:"Raio-X de tórax AP e perfil", cat:"Raio-X Médico e Odontológico", club:39, normal:79, card:115, note:"Não precisa agendar", schedule:false},
  {slug:"rx-incidencia-extra", name:"Incidência além da rotina", cat:"Raio-X Médico e Odontológico", club:20, normal:22, card:32, note:"", schedule:false},
  {slug:"rx-cefalometrico-perfil", name:"Raio-X cefalométrico — perfil ou lateral", cat:"Raio-X Médico e Odontológico", club:52, normal:72, card:104, note:"Não precisa agendar", schedule:false},
  {slug:"rx-cefalometrico-frontal", name:"Raio-X cefalométrico frontal", cat:"Raio-X Médico e Odontológico", club:55, normal:75, card:109, note:"Não precisa agendar", schedule:false},
  {slug:"rx-panoramico-odonto-laudo", name:"Raio-X panorâmico odontológico — com laudo", cat:"Raio-X Médico e Odontológico", club:49, normal:75, card:95, note:"Não precisa agendar", schedule:false},
  {slug:"rx-panoramico-odonto-sem-laudo", name:"Raio-X panorâmico odontológico — sem laudo", cat:"Raio-X Médico e Odontológico", club:39, normal:55, card:66, note:"Não precisa agendar", schedule:false},

  {slug:"ecg", name:"Eletrocardiograma com laudo", cat:"Exames Cardiológicos e Vascular", club:39, normal:79, card:115, note:"", schedule:true},
  {slug:"eco-doppler", name:"Ecocardiograma com Doppler", cat:"Exames Cardiológicos e Vascular", club:99, normal:169, card:245, note:"", schedule:true},
  {slug:"doppler-venoso", name:"Doppler venoso", cat:"Exames Cardiológicos e Vascular", club:110, normal:179, card:254, note:"Valor por membro", schedule:true},
  {slug:"doppler-arterial", name:"Doppler arterial", cat:"Exames Cardiológicos e Vascular", club:110, normal:179, card:254, note:"Valor por membro", schedule:true},
  {slug:"doppler-carotidas", name:"Doppler de carótidas e vertebrais", cat:"Exames Cardiológicos e Vascular", club:110, normal:185, card:268, note:"", schedule:true},
  {slug:"mapa-24h", name:"MAPA 24 horas", cat:"Exames Cardiológicos e Vascular", club:69, normal:175, card:253, note:"", schedule:true},
  {slug:"holter-24h", name:"Holter 24 horas", cat:"Exames Cardiológicos e Vascular", club:89, normal:189, card:274, note:"", schedule:true},

  {slug:"pacote-oftalmo", name:"Pacote Oftalmo", cat:"Exames e Procedimentos do Oftalmo", club:59, normal:59, note:"Grau dos óculos, fundo de olho e pressão ocular · quarta de manhã e quinta à tarde", schedule:true},
  {slug:"mapeamento-retina", name:"Mapeamento da retina", cat:"Exames e Procedimentos do Oftalmo", club:136, normal:140, card:204, note:"", schedule:true},
  {slug:"paquimetria", name:"Paquimetria", cat:"Exames e Procedimentos do Oftalmo", club:130, normal:144, card:210, note:"", schedule:true},
  {slug:"retinografia", name:"Retinografia", cat:"Exames e Procedimentos do Oftalmo", club:171, normal:190, card:276, note:"", schedule:true},

  {slug:"audiometria", name:"Audiometria", cat:"Outros Exames e Procedimentos", club:99, normal:130, card:188, note:"", schedule:true},
  {slug:"beta-hcg", name:"Beta HCG (teste de gravidez)", cat:"Outros Exames e Procedimentos", club:17, normal:29, card:42, note:"", schedule:true},
  {slug:"core-biopsy", name:"Core biopsy por ultrassom", cat:"Outros Exames e Procedimentos", club:395, normal:470, card:681, note:"Trazer mamografia e USG mamária anterior", schedule:true},
  {slug:"espirometria", name:"Espirometria", cat:"Outros Exames e Procedimentos", club:153, normal:170, card:247, note:"Resultado na hora", schedule:true},
  {slug:"fator-rh", name:"Fator RH + grupo sanguíneo", cat:"Outros Exames e Procedimentos", club:31, normal:34, card:50, note:"", schedule:true},
  {slug:"hemograma", name:"Hemograma completo", cat:"Outros Exames e Procedimentos", club:17, normal:19, card:28, note:"", schedule:true},
  {slug:"lavagem-ouvido", name:"Lavagem de ouvido", cat:"Outros Exames e Procedimentos", club:69, normal:99, card:144, note:"", schedule:true},
  {slug:"paaf-tireoide", name:"PAAF de tireóide", cat:"Outros Exames e Procedimentos", club:333, normal:370, card:537, note:"Valor por nódulo, sem laboratório", schedule:true},
  {slug:"preventivo", name:"Preventivo", cat:"Outros Exames e Procedimentos", club:48, normal:69, card:101, note:"Com pedido médico", schedule:true},
  {slug:"psa-total", name:"PSA total", cat:"Outros Exames e Procedimentos", club:40, normal:44, card:65, note:"Sem consulta", schedule:true},
  {slug:"retirada-diu", name:"Retirada de DIU", cat:"Outros Exames e Procedimentos", club:108, normal:120, card:174, note:"", schedule:true},
  {slug:"usg-prostata-transretal-biopsia", name:"USG de próstata transretal com biópsia (12 fragmentos)", cat:"Outros Exames e Procedimentos", club:950, normal:990, card:1436, note:"Preparo combinado pelo WhatsApp", schedule:true},
];

const TOP_EXAM_SLUGS = ["usg-abdome-total","mamografia","eco-doppler","usg-transvaginal","doppler-venoso","rx-joelho"];

const QUICK_RESULT_SLUGS = ["rx-torax","rx-joelho","espirometria"];

const PACKAGES = [
  {
    name:"Super Pacote Mulher", cat:"Saúde da mulher",
    items:["Ginecologista","Preventivo","USG transvaginal","USG mamária","Mamografia","Densitometria óssea"],
    club:333, normal:620, note:"Ginecologista com retorno em até 25 dias · economia anunciada no flyer: R$ 277"
  },
  {
    name:"Check-up Cardiológico", cat:"Cardiologia",
    items:["Cardiologista","Eletrocardiograma","Ecocardiograma"],
    club:227, normal:406, note:"Retorno da consulta em até 25 dias, quando necessário"
  },
  {
    name:"Pacote Risco Trombose", cat:"Exames Cardiológicos e Vascular",
    items:["Consulta com angiologista","Doppler venoso"],
    club:189, normal:null, note:"Consulta R$ 79 + Doppler venoso R$ 110 por membro no Club Echo · segunda, terça e sexta · resultado do exame e consulta na hora"
  }
];

const SPECIALTIES = [
  {slug:"angiologista", name:"Angiologista", days:"Quarta e sexta à tarde", club:79, normal:180, card:262, group:"Cardiovascular"},
  {slug:"cardiologista", name:"Cardiologista", days:"Terça, quarta, quinta, sexta e sábado", club:89, normal:158, card:230, group:"Cardiovascular"},
  {slug:"clinico-geral", name:"Clínico geral", days:"Segunda, quarta, quinta, sexta e sábado", club:49, normal:110, card:160, group:"Clínica geral e família"},
  {slug:"dermatologista", name:"Dermatologista", days:"Quarta à tarde, de 15 em 15 dias · Unidade 2", club:89, normal:150, card:217, group:"Outras especialidades"},
  {slug:"endocrinologista", name:"Endocrinologista", days:"Segunda de manhã/tarde e terça à tarde", club:59, normal:150, card:217, group:"Nutrição e metabolismo"},
  {slug:"gastro", name:"Gastroenterologista", days:"Segunda e quarta de manhã", club:59, normal:130, card:188, group:"Outras especialidades"},
  {slug:"geriatra", name:"Geriatra", days:"Segunda de manhã e sexta manhã/tarde", club:49, normal:110, card:160, group:"Clínica geral e família"},
  {slug:"ginecologista", name:"Ginecologista", days:"De segunda a sábado", club:59, normal:128, card:185, group:"Saúde da mulher"},
  {slug:"mastologista", name:"Mastologista", days:"Segunda-feira à tarde", club:69, normal:155, card:217, group:"Saúde da mulher"},
  {slug:"nutricionista", name:"Nutricionista", days:"Segunda e terça pela manhã · Unidade 2", club:0, normal:150, card:217, group:"Nutrição e metabolismo"},
  {slug:"oftalmologista", name:"Oftalmologista", days:"Quarta (dia todo) e quinta à tarde", club:59, normal:140, card:203, group:"Visão e audição"},
  {slug:"ortopedista", name:"Ortopedista", days:"Segunda e quinta à tarde", club:59, normal:125, card:179, group:"Ortopedia e reumatologia"},
  {slug:"otorrino", name:"Otorrinolaringologista", days:"Segunda à tarde", club:59, normal:120, card:174, group:"Visão e audição"},
  {slug:"pediatra", name:"Pediatra", days:"Segunda, terça, quinta e sábado pela manhã (de 0 a 11 anos) · Unidade 2", club:39, normal:120, card:174, group:"Clínica geral e família"},
  {slug:"pre-natal", name:"Pré-natal", days:"Quarta, sexta e sábado", club:59, normal:130, card:188, group:"Saúde da mulher"},
  {slug:"reumatologista", name:"Reumatologista", days:"Segunda e sábado, de 15 em 15 dias", club:39, normal:130, card:188, group:"Ortopedia e reumatologia"},
  {slug:"risco-cirurgico", name:"Risco cirúrgico", days:"Terça, quarta, quinta, sexta e sábado", club:89, normal:150, card:217, group:"Outras especialidades"},
  {slug:"urologista", name:"Urologista", days:"Terça e quinta à tarde", club:49, normal:130, card:188, group:"Outras especialidades"},
  {slug:"cirurgiao-vascular", name:"Cirurgião vascular", days:"Sexta-feira à tarde", club:79, normal:160, card:232, group:"Cardiovascular"},
];

const SPECIALTY_GROUPS = ["Saúde da mulher","Cardiovascular","Clínica geral e família","Visão e audição","Nutrição e metabolismo","Ortopedia e reumatologia","Outras especialidades"];

const CATEGORIES = ["Ultrassonografia","Ultrassonografia com Doppler","Raio-X Médico e Odontológico","Exames Cardiológicos e Vascular","Exames e Procedimentos do Oftalmo","Outros Exames e Procedimentos"];
