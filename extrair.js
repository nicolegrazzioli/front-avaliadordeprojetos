const fs = require('fs');
const path = require('path');

// CONFIGURAÇÕES
// Extensões que você quer capturar
const extensoesPermitidas = ['.ts', '.json', '.html', '.css', '.iml'];

// Pastas que DEVEMOS ignorar para não travar o script
const pastasIgnoradas = ['node_modules', '.git', '.angular', 'dist', '.idea'];

// Função recursiva para percorrer as pastas
function percorrerDiretorio(caminhoAtual) {
    let arquivos;
    
    try {
        arquivos = fs.readdirSync(caminhoAtual);
    } catch (erro) {
        console.error(`Erro ao ler diretório ${caminhoAtual}: ${erro.message}`);
        return;
    }

    arquivos.forEach(arquivo => {
        const caminhoCompleto = path.join(caminhoAtual, arquivo);
        const stats = fs.statSync(caminhoCompleto);

        if (stats.isDirectory()) {
            // Se for pasta, verifica se não está na lista de ignorados e entra nela (recursão)
            if (!pastasIgnoradas.includes(arquivo)) {
                percorrerDiretorio(caminhoCompleto);
            }
        } else {
            // Se for arquivo, verifica a extensão
            const extensao = path.extname(arquivo).toLowerCase();
            
            if (extensoesPermitidas.includes(extensao)) {
                // Ignora o package-lock.json pois é muito grande e irrelevante para leitura humana
                if (arquivo === 'package-lock.json') return; 

                lerEImprimirArquivo(caminhoCompleto, arquivo);
            }
        }
    });
}

function lerEImprimirArquivo(caminho, nomeArquivo) {
    try {
        const conteudo = fs.readFileSync(caminho, 'utf8');
        
        console.log('='.repeat(80));
        console.log(`📂 CAMINHO: ${caminho}`);
        console.log(`📄 ARQUIVO: ${nomeArquivo}`);
        console.log('-'.repeat(80));
        console.log(conteudo);
        console.log('\n\n'); // Pula linhas entre arquivos
        
    } catch (erro) {
        console.log(`[ERRO] Não foi possível ler o arquivo ${nomeArquivo}`);
    }
}

// Inicia o script no diretório atual ('.')
console.log(`Iniciando extração de arquivos: ${extensoesPermitidas.join(', ')}...\n`);
percorrerDiretorio('.');