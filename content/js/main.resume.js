const _main = document.getElementById('main')

run()

function run()
{
  fetch('./content/data/resume.json',{
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    _main.innerHTML = ''
    data.content.forEach((item, index) => {
      switch(item.nome)
      {
        case 'nome' :
          setPageTitle(item.content, index)
          break
        case 'contato':
          setPageContatos(item.content)
          break
        case 'endereco' :
          setPageEndereco(item.content)
          break
        case 'sobre' :
          setPageResume(item.content, item.title, index)
          break
        case 'formacao' :
          setPageFormacao(item.content, item.title, index)
          break
        case 'experiencia' :
          setPageExperiencia(item.content, item.title, index)
          break
        case 'projetos' :
          setPageProjetos(item.content, item.title, index)
          break
        case 'objetivos' :
          setPageResume(item.content, 'objetivos', index)
          break
        case 'conhecimentos' :
          setPageConhecimentos(item.content, 'conhecimentos')
          break
      }
    })
  })
}

// Helper function to parse date strings in the format dd/mm/aaaa
function parseDate(dateString) {
  const [dia, mes, ano] = dateString.split('/');
  if (!dia || !mes || !ano) return null;
  return new Date(`${ano}-${mes}-${dia}`);
}

// Handlers para cada tipo de wild-card (global)
const handlers = {
  idade: (arg) => {
    const birth = parseDate(arg);
    if (!birth) return '';
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age + ' anos';
  },
  experiencia: (arg) => {
    // Exemplo: calcula anos de experiência a partir de uma data inicial (dd/mm/aaaa)
    const [dia, mes, ano] = arg.split('/');
    if (!dia || !mes || !ano) return '';
    const start = new Date(`${ano}-${mes}-${dia}`);
    const today = new Date();
    let years = today.getFullYear() - start.getFullYear();
    const m = today.getMonth() - start.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < start.getDate())) {
      years--;
    }
    return years + (years === 1 ? ' ano de experiência' : ' anos de experiência');
  },
  // Adicione outros wild-cards aqui: nome: (arg) => { ... }
};

const regexText = /\{\{(\w+)\(([^\)]+)\)\}\}/g;

// Função global para processar wild-cards em textos (genérica)
function parseWildcards(text) {
  if (typeof text !== 'string') return text;

  // Regex genérica para {{nome(arg)}}
  text = text.replace(regexText, function(match, nome, arg) {
    if (handlers[nome]) {
      return handlers[nome](arg);
    }
    return match; // Se não houver handler, mantém o texto original
  });

  return text;
}

function setPageTitle(content, index)
{
  var items = []
  var h1 = document.createElement('h1')
  var h2 = document.createElement('h2')
  h1.textContent = parseWildcards(content[0].content)
  h2.textContent = parseWildcards(content[1].content)
  items = [h1,h2]

  sectionElement('sec-title',items, index)
}

function setPageResume(content, title, index)
{
  var items = []
  var tit = document.createElement('h3')
  var sec = document.createElement('section')
  
  tit.textContent = parseWildcards(title)

  content.forEach(item => {
    var p = document.createElement('p')
    p.innerHTML = parseWildcards(item)
    sec.append(p)
  })

  sectionElement('sec-resume', [tit,sec])
}

function setPageFormacao(content,title,index)
{
  var tit = document.createElement('h3')
  var sec = document.createElement('section')

  tit.textContent = parseWildcards(title)

  sec.classList.add('flex-col')

  content.forEach(item => {
    var cont = document.createElement('div')

    var area = document.createElement('h4')
    var esco = document.createElement('p')
    var data = document.createElement('p')
    var stat = document.createElement('p')

    var ar1 = document.createElement('div')
    var ar2 = document.createElement('div')

    cont.classList.add('flex-row', 'pl-20', 'pb-5')
    if (item.ativo === true) cont.classList.add('active')

    ar1.classList.add('flex-3')
    ar2.classList.add('flex-1')

    data.classList.add('sec')
    stat.classList.add('pri')

    area.textContent = parseWildcards(item.area)
    esco.textContent = parseWildcards(item.escola)
    data.textContent = parseWildcards(item.data)
    stat.textContent = parseWildcards(item.acao)

    ar1.append(...[area,esco])
    ar2.append(...[data,stat])

    cont.append(...[ar1,ar2])

    sec.append(cont)
  })

  sectionElement('sec-formacao', [tit,sec])
}

function setPageExperiencia(content,title,index)
{
  var tit = document.createElement('h3')
  var sec = document.createElement('section')

  tit.textContent = parseWildcards(title)

  sec.classList.add('flex-col')

  content.forEach(item => {
    var cont = document.createElement('div')
    var col = document.createElement('div')

    col.classList.add('flex','flex-col','pb-5')

    var area = document.createElement('h4')
    var empr = document.createElement('p')
    var data = document.createElement('p')
    var stat = document.createElement('p')
    var resm = document.createElement('p')

    var ar1 = document.createElement('div')
    var ar2 = document.createElement('div')
    var ar3 = document.createElement('div')

    cont.classList.add('flex-row', 'pl-20')
    if (item.ativo === true) cont.classList.add('active')

    ar1.classList.add('flex-3')
    ar2.classList.add('flex-1')

    data.classList.add('sec')
    stat.classList.add('pri')
    resm.classList.add('res')

    area.textContent = parseWildcards(item.area)
    empr.textContent = parseWildcards(item.empresa)
    data.textContent = parseWildcards(item.data)
    stat.textContent = parseWildcards(item.acao)
    
    ar1.append(...[area,empr])
    ar2.append(...[data,stat])
    
    cont.append(...[ar1,ar2])

    col.append(...[cont])

    if (item.resumo)
    {
      resm.textContent = parseWildcards(item.resumo)
      ar3.append(resm)
      col.append(ar3)
    }
    
    sec.append(col)
  })

  sectionElement('sec-formacao', [tit,sec])
}

function setPageProjetos(content,title,index)
{
  var tit = document.createElement('h3')
  var sec = document.createElement('section')

  // sec.classList.add('flex-col')
  tit.textContent = parseWildcards(title)

  content.forEach(item => {
    var p = document.createElement('p')

    var innerHtml = item.link === "" ?
      ' <span>' + parseWildcards(item.area) + '</span>'
      : 
        (item.link !== "private" ?
        ' <a class="link" href="'+item.link+'" target="blank">' + parseWildcards(item.area) + '&nbsp;<i class="fa fa-up-right-from-square tags"></i></a>' :
        ' <span class="link">' + parseWildcards(item.area) + '&nbsp;<i class="fa fa-user-lock tags"></i></a>')
      
    p.innerHTML = parseWildcards(item.titulo) + innerHtml;
    
    sec.append(p)
  })

  sectionElement('sec-projs', [tit,sec])
}

function setPageConhecimentos(content, title)
{
  var tit = document.createElement('h3')
  var sec = document.createElement('section')

  tit.textContent = parseWildcards(title)

  sec.classList.add('flex-row', 'flex-wrap', 'skills')

  content.forEach(item => {
    var d = document.createElement('div')
    d.classList.add('g' + item[1])
    d.textContent = parseWildcards(item[0])
    sec.append(d)
  })

  sectionElement('sec-conhecimentos', [tit,sec])
}

function setPageContatos(content)
{
  // var tit = document.createElement('h3')
  var sec = document.createElement('section')

  content.forEach(item => {
    var p = document.createElement('p')
    var a = document.createElement('a')
    var i = document.createElement('i')
    var e = document.createElement('em')

    i.classList.add(...item.icon)
    i.classList.add('noprint','pr-4')
    a.href = item.link
    a.target = "blank"
    e.textContent = parseWildcards(item.title)

    a.append(i,e)
    p.append(a)

    sec.append(p)
  })

  sectionElement('sec-contato', [sec])
}

function setPageEndereco(content)
{
  var sec = document.createElement('section')

  content.forEach(item => {
    var p = document.createElement('p')
    
    p.textContent = parseWildcards(item.content)

    sec.append(p)
  })

  sectionElement('sec-contato', [sec])
}

function sectionElement(classes, content)
{
  var section = document.createElement('section')
  section.classList.add(classes)

  section.append(...content)

  _main.append(section)
}