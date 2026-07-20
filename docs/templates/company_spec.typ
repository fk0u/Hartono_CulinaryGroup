// docs/templates/company_spec.typ
#let brand-color = rgb("#7A0C16")
#let gold-color = rgb("#D4AF37")
#let dark-color = rgb("#1E1E24")
#let bg-light = rgb("#FAFAFB")

#let project-profile(
  title: "",
  subtitle: "",
  doc-type: "",
  version: "1.0.0",
  date: "",
  author: "LITEXLY",
  body
) = {
  // Page Configuration
  set page(
    paper: "a4",
    margin: (x: 2.5cm, y: 3.5cm),
    header: context {
      if counter(page).get().first() > 1 {
        grid(
          columns: (1fr, auto),
          align(left)[
            #text(9pt, fill: brand-color, weight: "bold")[HARTONO CULINARY GROUP]
            #text(9pt, fill: gray)[ | #doc-type]
          ],
          align(right)[
            #text(8pt, fill: gray)[Versi #version]
          ]
        )
        v(0.2cm)
        line(length: 100%, stroke: 0.5pt + brand-color)
      }
    },
    footer: context {
      if counter(page).get().first() > 1 {
        line(length: 100%, stroke: 0.5pt + gray.lighten(50%))
        v(0.2cm)
        grid(
          columns: (1fr, auto),
          align(left)[
            #text(8pt, fill: gray)[Confidential & Proprietary]
          ],
          align(right)[
            #text(9pt, fill: dark-color)[Halaman #counter(page).get().first()]
          ]
        )
      }
    }
  )

  // Text Rules
  set text(
    font: "Arial",
    size: 10.5pt,
    fill: dark-color
  )

  // Heading Rules
  show heading: it => [
    #v(0.5cm)
    #text(fill: brand-color, weight: "bold")[
      #if it.level == 1 {
        block(width: 100%, below: 0.8em)[
          #text(size: 14pt)[#it.body]
          #v(4pt)
          #line(length: 100%, stroke: 1.5pt + gold-color)
        ]
      } else if it.level == 2 {
        block(below: 0.6em)[
          #text(size: 12pt, fill: brand-color.lighten(15%))[#it.body]
        ]
      } else {
        block(below: 0.5em)[
          #text(size: 11pt, style: "italic", fill: dark-color)[#it.body]
        ]
      }
    ]
    #v(0.2cm)
  ]

  // Cover Page
  page(header: none, footer: none, margin: 0cm)[
    #rect(
      width: 100%,
      height: 100%,
      fill: gradient.linear(brand-color, rgb("#3A0005"), angle: 45deg)
    )[
      #align(center + horizon)[
        #v(-2cm)
        #rect(fill: gold-color, width: 80pt, height: 4pt)
        #v(0.5cm)
        #text(size: 26pt, weight: "bold", fill: white)[#title] \
        #v(0.2cm)
        #text(size: 14pt, fill: gold-color, weight: "medium")[#subtitle] \
        #v(1.5cm)
        #rect(
          fill: rgb(255, 255, 255, 15%),
          radius: 4pt,
          inset: 15pt,
          stroke: 0.5pt + white.lighten(50%)
        )[
          #text(size: 11pt, fill: white)[
            *DOKUMEN SPESIFIKASI KORPORAT* \
            #v(0.2cm)
            Tipe: #doc-type \
            Tanggal: #date \
            Oleh: #author \
            Versi: #version
          ]
        ]
      ]
    ]
  ]

  body
}
