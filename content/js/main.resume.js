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

function setPageTitle(content, index)
{
  var items = []
  var h1 = document.createElement('h1')
  var h2 = document.createElement('h2')
  h1.textContent = content[0].content
  h2.textContent = content[1].content
  items = [h1,h2]

  sectionElement('sec-title',items, index)
}

function setPageResume(content, title, index)
{
  var items = []
  var tit = document.createElement('h3')
  var sec = document.createElement('section')
  
  tit.textContent = title

  content.forEach(item => {
    var p = document.createElement('p')
    p.innerHTML = item
    sec.append(p)
  })

  sectionElement('sec-resume', [tit,sec])
}

function setPageFormacao(content,title,index)
{
  var tit = document.createElement('h3')
  var sec = document.createElement('section')

  tit.textContent = title

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

    area.textContent = item.area
    esco.textContent = item.escola
    data.textContent = item.data
    stat.textContent = item.acao

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

  tit.textContent = title

  sec.classList.add('flex-col')

  content.forEach(item => {
    var cont = document.createElement('div')

    var area = document.createElement('h4')
    var empr = document.createElement('p')
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

    area.textContent = item.area
    empr.textContent = item.empresa
    data.textContent = item.data
    stat.textContent = item.acao

    ar1.append(...[area,empr])
    ar2.append(...[data,stat])

    cont.append(...[ar1,ar2])

    sec.append(cont)
  })

  sectionElement('sec-formacao', [tit,sec])
}

function setPageProjetos(content,title,index)
{
  var tit = document.createElement('h3')
  var sec = document.createElement('section')

  // sec.classList.add('flex-col')
  tit.textContent = title

  content.forEach(item => {
    var p = document.createElement('p')

    var innerHtml = item.link === "" ?
      ' <span>' + item.area + '</span>'
      : 
        (item.link !== "private" ?
        ' <a class="link" href="'+item.link+'" target="blank">' + item.area + '&nbsp;<i class="fa fa-up-right-from-square tags"></i></a>' :
        ' <span class="link">' + item.area + '&nbsp;<i class="fa fa-user-lock tags"></i></a>')
      
    p.innerHTML = item.titulo + innerHtml;
    
    sec.append(p)
  })

  sectionElement('sec-projs', [tit,sec])
}

function setPageConhecimentos(content, title)
{
  var tit = document.createElement('h3')
  var sec = document.createElement('section')

  tit.textContent = title

  sec.classList.add('flex-row', 'flex-wrap', 'skills')

  content.forEach(item => {
    var d = document.createElement('div')
    d.classList.add('g' + item[1])
    d.textContent = item[0]
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
    e.textContent = item.title

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
    
    p.textContent = item.content

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