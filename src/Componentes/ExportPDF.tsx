import { MlCreatePdfForm } from "@mapcomponents/react-maplibre";

import { logoToBase64 } from "./logo";


export interface exportPDFProps{
titulo?: string,
showForm: boolean
}

export default function ExportPDF(props: exportPDFProps){
   
    return(<>
   {props.showForm &&  <MlCreatePdfForm

				onCreatePdf={(options) => {
                    
					const pdf = options.pdf;
				
					const offsetX = 2.5;
					const offsetY = 2.5;
					const marginTop = 3;
					const marginBottom = 3;
					const innerMargin = 2;
					const logo = logoToBase64();
                    const textBuffer = 1;
					const lineHeight = 3.25;
					const text = '';
					const textChunksSeperator = text.split(',');
					const textChunks: string[] = [];

					if (textChunks.length) {
						textChunksSeperator.forEach((chunk: string) => {
							const limitChunks: RegExpMatchArray | null = chunk.match(/.{1,34}/g);
							if (limitChunks) {
								textChunks.push(...limitChunks);
							}
						});
					}
					//Render infobox
					pdf.setFillColor('white');
					const infoBoxSize =
						textChunks.length * lineHeight +
						marginTop +
						marginBottom +
						lineHeight * 2 +
						innerMargin * 2 +
						textBuffer;

					pdf.rect(offsetX, 2, 66.5, infoBoxSize, 'F');

					pdf.setFontSize(10);
					pdf.text(props.titulo?? "Mapa:", 6, offsetY + marginTop);

					//Render inner infobox
					pdf.rect(6, 7, 60, textChunks.length * lineHeight + innerMargin * 2 + textBuffer);
					pdf.setFontSize(10);


					//Write out address
					textChunks.forEach((text, i) => {
						pdf.text(text.trim(), 8, 10 + i * 3.5 + innerMargin);
					});

					//Add Logo
					pdf.addImage(
						logo,
						'png',
						4,
						//offsetY + marginTop + lineHeight * 2 + textChunks.length * 3 + innerMargin * 2,
                       12,
						8,
						8,
						undefined,
						'FAST'
					);

					//Add Url
					pdf.setFontSize(10);
					pdf.text(
						'puntalagro.com',
						40,
						offsetY +
							marginTop +
							lineHeight * 2 +
							textChunks.length * lineHeight +
							innerMargin * 2 +
							textBuffer
					);

					//Set pdfs props
					pdf.setProperties({
						title: props.titulo?? "Mapa",
						subject: props.titulo?? "Mapa",
						creator: 'Puntal Agro '						
					});
                    
                    return options;
				}}
			/> 	}
  

    </>)
}