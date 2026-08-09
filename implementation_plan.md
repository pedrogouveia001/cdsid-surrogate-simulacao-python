# Plano de Implementação e Resumo do Estudo de Simulação

Este documento apresenta o status atual do estudo de simulação para a Heurística de Elicitação por Decomposição no SPEAR e instrui como retomar e concluir as execuções restantes em outra máquina.

---

## 1. Status Atual do Estudo

Até o momento, **23 dos 25 cenários planejados** foram concluídos com sucesso. As instâncias foram simuladas (1.000 instâncias por caso), as métricas estatísticas foram registradas no arquivo JSON e as capturas de tela dos painéis de resultados do sistema foram salvas.

### Cenários Concluídos (23/25)
* **3 Critérios (5/5 Casos):** 10A3C, 20A3C, 50A3C, 100A3C, 200A3C
* **4 Critérios (5/5 Casos):** 10A4C, 20A4C, 50A4C, 100A4C, 200A4C
* **5 Critérios (5/5 Casos):** 10A5C, 20A5C, 50A5C, 100A5C, 200A5C
* **6 Critérios (5/5 Casos):** 10A6C, 20A6C, 50A6C, 100A6C, 200A6C
* **7 Critérios (3/5 Casos):** 10A7C, 20A7C, 50A7C

### Relatório Compilado Parcial
O relatório em formato Word (.docx) foi compilado com o texto acadêmico e as tabelas/prints das 23 configurações acima e está disponível em:
[ESTUDO_SIMULACAO_HEURISTICA_SPEAR.docx](file:///C:/Pedro%20-%20CDSID/Sistema%20de%20Simula%C3%A7%C3%A3o/Surrogate%20Simula%C3%A7%C3%A3o/Surrogate%20Simula%C3%A7%C3%A3o%20Python/study/ESTUDO_SIMULACAO_HEURISTICA_SPEAR.docx)

---

## 2. Cenários Faltantes

Restam apenas as duas configurações mais complexas de 7 critérios:
1. **100A7C** (100 alternativas, 7 critérios - 1.000 instâncias)
2. **200A7C** (200 alternativas, 7 critérios - 1.000 instâncias)

---

## 3. Como Retomar e Concluir em Outra Máquina

Os scripts de automação foram projetados com um mecanismo de **resumo automático**. Ao serem executados, eles leem o arquivo `study_results.json` existente e ignoram os cenários que já possuem dados salvos.

### Passo 1: Transferir a pasta do projeto
Compacte e copie a pasta completa `Surrogate Simulação Python` para a nova máquina. Certifique-se de que os seguintes arquivos no diretório `study/` sejam copiados:
* `study/study_results.json` (contém os dados estatísticos dos 23 casos já executados)
* `study/screenshots/` (contém as imagens `results_*.png` geradas)
* `study/run_study_automation.py` (script de automação)
* `study/generate_study_report.py` (script de compilação do Word)

### Passo 2: Instalar as dependências na nova máquina
No terminal da nova máquina, dentro da pasta do projeto, ative o ambiente virtual e instale as dependências adicionais necessárias:
```bash
.\venv\Scripts\activate
pip install selenium webdriver-manager python-docx
```
*(Certifique-se de ter o Google Chrome instalado na nova máquina, pois o Selenium o utilizará de forma headless).*

### Passo 3: Iniciar o servidor Flask local
Inicie o servidor Flask na nova máquina para que os scripts possam simular e capturar as telas:
```bash
python run.py
```
*(Deixe o servidor rodando em background na porta 5001).*

### Passo 4: Executar a automação dos casos restantes
Abra outro terminal, ative o venv e execute o script de automação:
```bash
python study/run_study_automation.py
```
O script identificará automaticamente os 23 casos concluídos, exibirá a mensagem de resumo e executará apenas os dois casos restantes (`100A7C` e `200A7C`), salvando as capturas e adicionando os dados no arquivo JSON.

### Passo 5: Compilar o relatório Word Final
Após o script de automação finalizar, execute o compilador de relatório para ler os 25 casos e gerar o Word completo:
```bash
python study/generate_study_report.py
```
Isso atualizará o arquivo `ESTUDO_SIMULACAO_HEURISTICA_SPEAR.docx` contendo as 25 configurações com todas as tabelas e prints integrados de forma profissional.
