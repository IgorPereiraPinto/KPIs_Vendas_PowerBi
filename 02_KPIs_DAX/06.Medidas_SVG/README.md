# 06.Medidas_SVG

Documentação das medidas desta categoria com explicações didáticas. As fórmulas DAX foram mantidas exatamente como no catálogo original.

## Medida: Imagem Tabela Cidades

- **Descrição:** Gera SVG para exibição de cidade, faturamento e margem com animação.
- **Explicação didática:** Em termos simples, esta medida gera svg para exibição de cidade, faturamento e margem com animação..
- **Usa:** `[Faturamento]`, `[Margem]`, `dClientes[Cidade]`
- **Observações:** Retorna string SVG para uso em visual com transições CSS.

### DAX:
```DAX
Imagem Tabela Cidades = 
VAR vCidade = SELECTEDVALUE( dClientes[Cidade] )

VAR vValor = [Faturamento]

VAR vValor_formatado = 
    SWITCH(
        TRUE(),
        vValor >= 1000000000, FORMAT(vValor, "0,,,.00 Bi"),
        vValor >= 1000000, FORMAT(vValor, "0,,.00 Mi"),
        vValor >= 1000, FORMAT(vValor, "0,.00 K"),
        FORMAT(vValor, "0")
    ) 


VAR vMargem_formatada = FORMAT( [Margem], "0.00%" ) 

-----------------------------------------
-- FORMATAÇÕES 
-----------------------------------------

VAR vFonte = "Segoe UI"

VAR vCidade_cor = "#f1f1f1"
VAR vCidade_tam = 12 


RETURN 
"
<svg  width='255' height='79' viewBox='0 0 255 65' fill='none' xmlns='http://www.w3.org/2000/svg'>

    <defs>
        <style>
     

            #txt_cidade, #txt_faturamento, #txt_margem {
                transition: 0.5s
            }

            svg:hover #txt_cidade {
                transform:translate(126px)
            }

            svg:hover #txt_faturamento {
                transform:translate(-126px)
            }

            svg:hover #txt_margem {
                transform:translate(-126px)
            }


        </style> 

    </defs>

	<g id='tabela_cidades'>
		<line id='divisor' x1='127.5' y1='14' x2='127.5' y2='50' stroke='white' stroke-opacity='0.1'/>

		<text id='txt_cidade' fill='" & vCidade_cor & "'  font-family='" & vFonte & "' font-size='" & vCidade_tam & "' font-weight='400'>
			<tspan x='28' y='37'>
                " & vCidade & "
            </tspan>
		</text>

		<text id='txt_faturamento' fill='#f1f1f1'  font-family='" & vFonte & "' font-size='13' font-weight='600'>
			<tspan x='155' y='26.2109'>
                R$ " & vValor_formatado & "
            </tspan>
		</text>
		<text id='txt_margem' fill='#D1783C'  font-family='" & vFonte & "' font-size='13' font-weight='600'>
			<tspan x='155' y='53.2109'>
                " & vMargem_formatada & "
            </tspan>
		</text>
	</g>
</svg>
"
```

## Medida: Imagem Variacao Comissao

- **Descrição:** SVG de variação YoY da comissão com seta/cor dinâmica.
- **Explicação didática:** Em termos simples, esta medida svg de variação yoy da comissão com seta/cor dinâmica..
- **Usa:** `[Comissao YoY %]`
- **Observações:** Ativa animação de piscar quando valor é negativo.

### DAX:
```DAX
Imagem Variacao Comissao = 

VAR vValor = [Comissao YoY %] 

VAR vValor_formatado = FORMAT( vValor + 0 , "+0.00%; -0.00%; - " ) 

VAR vSeta = 
    SWITCH(
        TRUE(),
        vValor > 0, "⮝",
        vValor < 0, "⮟"
    )

VAR vCor_variacao = 
    SWITCH(
        TRUE(),
        vValor > 0, "#55AF3B",
        vValor < 0, "#D16961",
        "#f1f1f1"
    )

VAR vRot_categoria = "Vs. Ano Anterior" 

VAR vFonte = "Segoe Ui" 

VAR vRot_categoria_cor = "#02101B" 

VAR vAnimacao = 
    IF( vValor < 0, "animation" ) 


RETURN 

"data:image/svg+xml, 
<svg  viewBox='0 0 190 50' fill='none' xmlns='http://www.w3.org/2000/svg'>

        <defs>
            <style>

                #rot_dados, #seta {
                    " & vAnimacao & ": blink-1 1.5s infinite both;
                }

                @keyframes blink-1 {
                    0%,
                    50%,
                    100% {
                        opacity: 1;
                    }
                    25%,
                    75% {
                        opacity: 0;
                    }
                }

            </style> 

        </defs> 
        
		<text id='rot_cat' fill='" & vRot_categoria_cor & "' font-family='" & vFonte & "' font-size='12' font-weight='400' >
			<tspan x='88' y='40.9688'>
                " & vRot_categoria & "
            </tspan>
		</text>

		<text id='rot_dados' fill='" & vCor_variacao & "' font-family='" & vFonte & "' font-size='12' font-weight='600' >
			<tspan x='88' y='21.2969' font-weight='600'>
                " & vValor_formatado  & "
            </tspan>
		</text>

		<text id='seta' fill='" & vCor_variacao & "' font-family='" & vFonte & "' font-size='14' font-weight='600' >
			<tspan x='68' y='31.2969'>
                " & vSeta & "
            </tspan>
		</text>

</svg>
"
```

## Medida: Imagem Variacao Faturamento

- **Descrição:** SVG de variação YoY do faturamento com seta/cor dinâmica.
- **Explicação didática:** Em termos simples, esta medida svg de variação yoy do faturamento com seta/cor dinâmica..
- **Usa:** `[Faturamento YoY %]`
- **Observações:** Ativa animação de piscar quando valor é negativo.

### DAX:
```DAX
Imagem Variacao Faturamento = 

VAR vValor = [Faturamento YoY %] 

VAR vValor_formatado = FORMAT( vValor + 0 , "+0.00%; -0.00%; - " ) 

VAR vSeta = 
    SWITCH(
        TRUE(),
        vValor > 0, "⮝",
        vValor < 0, "⮟"
    )

VAR vCor_variacao = 
    SWITCH(
        TRUE(),
        vValor > 0, "#55AF3B",
        vValor < 0, "#D16961",
        "#f1f1f1"
    )

VAR vRot_categoria = "Vs. Ano Anterior" 

VAR vFonte = "Segoe Ui" 

VAR vRot_categoria_cor = "#02101B" 

VAR vAnimacao = 
    IF( vValor < 0, "animation" ) 


RETURN 

"data:image/svg+xml, 
<svg  viewBox='0 0 190 50' fill='none' xmlns='http://www.w3.org/2000/svg'>

        <defs>
            <style>

                #rot_dados, #seta {
                    " & vAnimacao & ": blink-1 1.5s infinite both;
                }

                @keyframes blink-1 {
                    0%,
                    50%,
                    100% {
                        opacity: 1;
                    }
                    25%,
                    75% {
                        opacity: 0;
                    }
                }

            </style> 

        </defs> 
        
		<text id='rot_cat' fill='" & vRot_categoria_cor & "' font-family='" & vFonte & "' font-size='12' font-weight='400' >
			<tspan x='88' y='40.9688'>
                " & vRot_categoria & "
            </tspan>
		</text>

		<text id='rot_dados' fill='" & vCor_variacao & "' font-family='" & vFonte & "' font-size='12' font-weight='600' >
			<tspan x='88' y='21.2969' font-weight='600' >
                " & vValor_formatado  & "
            </tspan>
		</text>

		<text id='seta' fill='" & vCor_variacao & "' font-family='" & vFonte & "' font-size='14' font-weight='600' >
			<tspan x='68' y='31.2969'>
                " & vSeta & "
            </tspan>
		</text>

</svg>
"
```

## Medida: Imagem Variacao Margem

- **Descrição:** SVG de variação YoY da margem com seta/cor dinâmica.
- **Explicação didática:** Em termos simples, esta medida svg de variação yoy da margem com seta/cor dinâmica..
- **Usa:** `[Margem YoY %]`
- **Observações:** Ativa animação de piscar quando valor é negativo.

### DAX:
```DAX
Imagem Variacao Margem = 

VAR vValor = [Margem YoY %] 

VAR vValor_formatado = FORMAT( vValor + 0 , "+0.00%; -0.00%; - " ) 

VAR vSeta = 
    SWITCH(
        TRUE(),
        vValor > 0, "⮝",
        vValor < 0, "⮟"
    )

VAR vCor_variacao = 
    SWITCH(
        TRUE(),
        vValor > 0, "#4B8D38",
        vValor < 0, "#D16961",
        "#f1f1f1"
    )

VAR vRot_categoria = "Vs. Ano Anterior" 

VAR vFonte = "Segoe Ui" 

VAR vRot_categoria_cor = "#02101B" 

VAR vAnimacao = 
    IF( vValor < 0, "animation" ) 


RETURN 

"data:image/svg+xml, 
<svg  viewBox='0 0 190 50' fill='none' xmlns='http://www.w3.org/2000/svg'>

        <defs>
            <style>

                #rot_dados, #seta {
                    " & vAnimacao & ": blink-1 1.5s infinite both;
                }

                @keyframes blink-1 {
                    0%,
                    50%,
                    100% {
                        opacity: 1;
                    }
                    25%,
                    75% {
                        opacity: 0;
                    }
                }

            </style> 

        </defs> 

		
		<text id='rot_cat' fill='" & vRot_categoria_cor & "' font-family='" & vFonte & "' font-size='12' font-weight='400' >
			<tspan x='88' y='40.9688'>
                " & vRot_categoria & "
            </tspan>
		</text>

		<text id='rot_dados' fill='" & vCor_variacao & "' font-family='" & vFonte & "' font-size='12' font-weight='600' >
			<tspan x='88' y='21.2969' font-weight='600'  >
                " & vValor_formatado  & "
            </tspan>
		</text>

		<text id='seta' fill='" & vCor_variacao & "' font-family='" & vFonte & "' font-size='14' font-weight='600' >
			<tspan x='68' y='31.2969'>
                " & vSeta & "
            </tspan>
		</text>

</svg>
"
```

## Medida: Imagem Variacao Resultado

- **Descrição:** SVG de variação YoY do resultado com seta/cor dinâmica.
- **Explicação didática:** Em termos simples, esta medida svg de variação yoy do resultado com seta/cor dinâmica..
- **Usa:** `[Resultado YoY %]`
- **Observações:** Ativa animação de piscar quando valor é negativo.

### DAX:
```DAX
Imagem Variacao Resultado = 

VAR vValor = [Resultado YoY %] 

VAR vValor_formatado = FORMAT( vValor + 0 , "+0.00%; -0.00%; - " ) 

VAR vSeta = 
    SWITCH(
        TRUE(),
        vValor > 0, "⮝",
        vValor < 0, "⮟"
    )

VAR vCor_variacao = 
    SWITCH(
        TRUE(),
        vValor > 0, "#4B8D38",
        vValor < 0, "#D16961",
        "#f1f1f1"
    )

VAR vRot_categoria = "Vs. Ano Anterior" 

VAR vFonte = "Segoe Ui" 

VAR vRot_categoria_cor = "#02101B" 

VAR vAnimacao = 
    IF( vValor < 0, "animation" ) 


RETURN 

"data:image/svg+xml, 
<svg  viewBox='0 0 190 50' fill='none' xmlns='http://www.w3.org/2000/svg'>

        <defs>
            <style>

                #rot_dados, #seta {
                    " & vAnimacao & ": blink-1 1.5s infinite ;
                }

                @keyframes blink-1 {
                    0%,
                    50%,
                    100% {
                        opacity: 1;
                    }
                    25%,
                    75% {
                        opacity: 0;
                    }
                }

            </style> 

        </defs> 
		
		<text id='rot_cat' fill='" & vRot_categoria_cor & "' font-family='" & vFonte & "' font-size='12' font-weight='400' >
			<tspan x='88' y='40.9688'>
                " & vRot_categoria & "
            </tspan>
		</text>

		<text id='rot_dados' fill='" & vCor_variacao & "' font-family='" & vFonte & "' font-size='12' font-weight='600' >
			<tspan x='88' y='21.2969'>
                " & vValor_formatado  & "
            </tspan>
		</text>

		<text id='seta' fill='" & vCor_variacao & "' font-family='" & vFonte & "' font-size='14' font-weight='600' >
			<tspan x='68' y='31.2969'>
                " & vSeta & "
            </tspan>
		</text>

</svg>
"
```

## Medida: Imagem Vendedor

- **Descrição:** Retorna HTML/CSS para exibir foto circular animada do vendedor.
- **Explicação didática:** Em termos simples, esta medida retorna html/css para exibir foto circular animada do vendedor..
- **Usa:** `dVendedores[URL Foto]`
- **Observações:** Usa animação `rotate-scale-down` no carregamento.

### DAX:
```DAX
Imagem Vendedor = 

VAR vVendedor_selecionado = SELECTEDVALUE( dVendedores[URL Foto] )

RETURN 


"
    <style>

        div {
            display: flex;
            justify-content: center;
            align-items: center;
            
        }

        img{
            width: 80vw;
            height: 80vw;

            object-fit: cover;

            border-radius: 50%;

            animation: rotate-scale-down 1s linear both;
        }


        @keyframes rotate-scale-down {
            0% {
                transform: scale(1) rotateZ(0);
            }
            50% {
                transform: scale(0.5) rotateZ(180deg);
            }
            100% {
                transform: scale(1) rotateZ(360deg);
            }
        }


    </style> 

    <img src='" & vVendedor_selecionado & "' > 


"
```

## Medida: Velocimetro

- **Descrição:** Gera SVG de velocímetro para percentual de meta.
- **Explicação didática:** Em termos simples, esta medida gera svg de velocímetro para percentual de meta..
- **Usa:** `[Porcentagem Meta]`, `[Meta Cor]`
- **Observações:** Limita rotação máxima para não ultrapassar o ponteiro final.

### DAX:
```DAX
Velocimetro = 

VAR vValor = [Porcentagem Meta]


VAR vValor_formatado = FORMAT( vValor, "0%" ) 



VAR vFator = -- Valor de rotação necessário para que o ponteiro saia do ponto ZERO e alcance o ponto CEM.
    186

VAR vRotacionar = 
     ROUND( vValor * vFator , 0 ) 


VAR vLimite_maximo =  -- Valor limite para evitar que o ponteiro ultrapasse o ponto máximo.
    262 

VAR vRotacionar_ajustado = 
    IF( 
        vRotacionar <= vLimite_maximo, 
        vRotacionar, 
        vLimite_maximo 
    ) 



---------------------------------------------
-- FORMATAÇÕES 
---------------------------------------------

VAR vFonte = "Cambria"

VAR vRot_categoria = "Meta %"

VAR vRotulo_dados_tam = 30
VAR vRotulo_dados_cor = [Meta Cor] 

VAR vCor_seta = vRotulo_dados_cor 

VAR vMarcador_comum_cor  = "#9A9FA4" 

VAR vMarcador_max_cor  = vRotulo_dados_cor 

VAR vNumeros_cor = "#9A9FA4"

RETURN 


"
<svg  viewBox='0 0 250 200' fill='none' xmlns='http://www.w3.org/2000/svg'>

        <defs>

            <style>
                #ponteiro {

                    transform: rotate(" & vRotacionar_ajustado & "deg);
                    transform-origin: center;
                    transform-box: fill-box;

                    animation: anima_ponteiro .7s linear forwards
                }

       
            </style> 

        </defs>
	
	
		<g id='marcadores'>
			<path id='marcador' fill-rule='evenodd' clip-rule='evenodd' d='M0 0' fill='" &vMarcador_comum_cor & "'/>
			<path id='marcador_maximo' fill-rule='evenodd' clip-rule='evenodd' d='M0 0' fill='" & vMarcador_max_cor & "'/>
		</g>
		<g id='ponteiro'>
			<circle id='circ_giro' cx='126.5' cy='113.499' r='91.5' fill='#0000' fill-opacity='0.24'/>
			<path id='seta' d='M63.7784 163.683C63.1195 163.739 62.6213 163.098 62.8382 162.474L70.4118 140.66C70.9396 139.14 73.0417 138.988 73.7927 140.412C75.6091 143.854 78.1977 148.622 79.4077 150.204C80.6502 151.829 84.5948 155.875 87.3372 158.64C88.4344 159.747 87.7435 161.641 86.1908 161.773L63.7784 163.683Z' fill='" & vCor_seta & "'/>
		</g>

		<g id='numeros'>
			<text id='0' fill='" & vNumeros_cor & "'  font-family='" & vFonte & "' font-size='15.015' font-weight='600' >
				<tspan x='34' y='188.383'>0</tspan>
			</text>
			<text id='20' fill='" & vNumeros_cor & "'  font-family='" & vFonte & "' font-size='15.015' font-weight='600' >
				<tspan x='12' y='126.383'>20</tspan>
			</text>
			<text id='40' fill='" & vNumeros_cor & "'  font-family='" & vFonte & "' font-size='15.015' font-weight='600' >
				<tspan x='26' y='62.3829'>40</tspan>
			</text>
			<text id='60' fill='" & vNumeros_cor & "'  font-family='" & vFonte & "' font-size='15.015' font-weight='600' >
				<tspan x='81' y='21.3829'>60</tspan>
			</text>
			<text id='80' fill='" & vNumeros_cor & "'  font-family='" & vFonte & "' font-size='15.015' font-weight='600' >
				<tspan x='150' y='19.3829'>80</tspan>
			</text>
			<text id='100' fill='" & vNumeros_cor & "'  font-family='" & vFonte & "' font-size='15.015' font-weight='600' >
				<tspan x='211' y='57.3829'>100</tspan>
			</text>
			<text id='MAX' fill='" & vMarcador_max_cor & "'  font-family='" & vFonte & "' font-size='15.015' font-weight='600' >
				<tspan x='205' y='188.383'>MAX</tspan>
			</text>
		</g>

		<text id='rot_dados' fill='" & vRotulo_dados_cor & "'  font-family='" & vFonte & "' font-size='" & vRotulo_dados_tam & "' font-weight='600' text-anchor='middle' >
			<tspan x='125' y='129.255'> " & vValor_formatado & "</tspan>
		</text>
		<text id='rot_catgoria' fill='" & vMarcador_comum_cor & "'  font-family='" & vFonte & "' font-size='13' font-weight='600' text-anchor='middle' >
			<tspan x='125' y='95.6605'> " & vRot_categoria & "</tspan>
		</text>

        <path id='contorno_interno' d='M162.459 162.154C172.619 154.645 180.174 144.143 184.063 132.123C187.952 120.102 187.98 107.165 184.143 95.1275C180.306 83.09 172.797 72.5556 162.669 65.0024C152.542 57.4491 140.303 53.256 127.672 53.0113C115.04 52.7667 102.648 56.4827 92.2357 63.6381C81.8231 70.7935 73.9118 81.0292 69.6118 92.9091C65.3118 104.789 64.8389 117.717 68.2594 129.879C71.6799 142.042 78.8222 152.828 88.6842 160.725L89.5723 159.616C79.9419 151.905 72.9673 141.372 69.6272 129.495C66.287 117.618 66.7488 104.994 70.9478 93.3927C75.1468 81.7917 82.8723 71.7964 93.0404 64.8091C103.208 57.8217 115.309 54.1929 127.644 54.4319C139.979 54.6708 151.93 58.7654 161.82 66.1413C171.71 73.5172 179.043 83.8042 182.789 95.559C186.536 107.314 186.508 119.947 182.711 131.685C178.913 143.424 171.536 153.679 161.614 161.012L162.459 162.154Z' fill='" & vRotulo_dados_cor & "'/>


</svg>
"
```
