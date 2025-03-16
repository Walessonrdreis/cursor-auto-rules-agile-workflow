@echo off
setlocal EnableDelayedExpansion
chcp 65001 >nul

echo DEBUG: Script started

REM Vérifier que le répertoire cible est fourni
if "%~1"=="" (
    echo Error: Please provide the target project directory
    echo Usage: %~nx0 ^<target-project-directory^>
    exit /b 1
)
set "TARGET_DIR=%~1"

REM Créer le répertoire cible s'il n'existe pas, et initialiser le README.md
if not exist "%TARGET_DIR%\" (
    echo Creating new project directory: %TARGET_DIR%
    mkdir "%TARGET_DIR%"
    (
        echo # New Project
        echo.
        echo This project has been initialized with agile workflow support and auto rule generation configured from [cursor-auto-rules-agile-workflow](https://github.com/bmadcode/cursor-auto-rules-agile-workflow)
        echo.
        echo For workflow documentation, see [Workflow Rules](docs/workflow-rules.md)
    ) > "%TARGET_DIR%\README.md"
)

REM Créer le dossier .cursor\rules
if not exist "%TARGET_DIR%\.cursor\rules\" (
    mkdir "%TARGET_DIR%\.cursor\rules"
)

REM Créer le dossier .cursor\templates
if not exist "%TARGET_DIR%\.cursor\templates\" (
    mkdir "%TARGET_DIR%\.cursor\templates"
)

REM Copier les fichiers de règles de base (sans écraser les existants)
echo Copying core rule files...
for %%F in (.cursor\rules\*.mdc) do (
    if not exist "%TARGET_DIR%\.cursor\rules\%%~nxF" (
        copy "%%F" "%TARGET_DIR%\.cursor\rules\" >nul
    )
)

REM Copier les fichiers templates
echo Copying template files...
xcopy ".cursor\templates\*.*" "%TARGET_DIR%\.cursor\templates\" /E /I /Y >nul

REM Créer le dossier docs et générer le fichier de documentation workflow-rules.md
if not exist "%TARGET_DIR%\docs\" (
    mkdir "%TARGET_DIR%\docs"
)
(
    echo # Cursor Workflow Rules
    echo.
    echo This project has been updated to use the auto rule generator from [cursor-auto-rules-agile-workflow](https://github.com/bmadcode/cursor-auto-rules-agile-workflow)
    echo.
    echo ^> **Note**: This script can be safely re-run at any time to update the template rules to their latest versions^. It will not impact or overwrite any custom rules you've created^.
    echo.
    echo ## Core Features
    echo.
    echo - Automated rule generation
    echo - Standardized documentation formats
    echo - AI behavior control and optimization
    echo - Flexible workflow integration options
    echo.
    echo ## Workflow Integration Options
    echo.
    echo ### 1^. Automatic Rule Application (Recommended)
    echo The core workflow rules are automatically installed in ^.cursor/rules/:
    echo - `901-prd^.mdc` - Product Requirements Document standards
    echo - `902-arch^.mdc` - Architecture documentation standards
    echo - `903-story^.mdc` - User story standards
    echo - `801-workflow-agile^.mdc` - Complete Agile workflow (optional)
    echo.
    echo These rules are automatically applied when working with corresponding file types^.
    echo.
    echo ### 2^. Notepad-Based Workflow
    echo For a more flexible approach, use the templates in `xnotes/`:
    echo 1^. Enable Notepads in Cursor options
    echo 2^. Create a new notepad (e^.g^., "agile")
    echo 3^. Copy contents from `xnotes/workflow-agile^.md`
    echo 4^. Use `@notepad-name` in conversations
    echo.
    echo ^> **Tip:** The Notepad approach is ideal for:
    echo ^> - Initial project setup
    echo ^> - Story implementation
    echo ^> - Focused development sessions
    echo ^> - Reducing context overhead
    echo.
    echo ## Getting Started
    echo.
    echo 1^. Review the templates in `xnotes/`
    echo 2^. Choose your preferred workflow approach
    echo 3^. Start using the AI with confidence!
    echo.
    echo For demos and tutorials, visit: [BMad Code Videos](https://youtube^.com/bmadcode)
) > "%TARGET_DIR%\docs\workflow-rules.md"

REM Mettre à jour le .gitignore avec xnotes et docs
if exist "%TARGET_DIR%\.gitignore" (
    findstr /L /C:".cursor/rules/_*.mdc" "%TARGET_DIR%\.gitignore" >nul
    if errorlevel 1 (
        (
            echo.
            echo # Private individual user cursor rules
            echo .cursor/rules/_*.mdc
            echo.
            echo # Documentation and templates
            echo xnotes/
            echo docs/
        ) >> "%TARGET_DIR%\.gitignore"
    )
) else (
    (
        echo # Private individual user cursor rules
        echo .cursor/rules/_*.mdc
        echo.
        echo # Documentation and templates
        echo xnotes/
        echo docs/
    ) > "%TARGET_DIR%\.gitignore"
)

REM Installer les templates de Notepad
echo Setting up Notepad templates...
if not exist "%TARGET_DIR%\xnotes\" (
    mkdir "%TARGET_DIR%\xnotes"
)
xcopy "xnotes\*.*" "%TARGET_DIR%\xnotes\" /E /I /Y >nul

REM Mettre à jour le .cursorignore
if exist "%TARGET_DIR%\.cursorignore" (
    findstr /L /C:"xnotes/" "%TARGET_DIR%\.cursorignore" >nul
    if errorlevel 1 (
        (
            echo.
            echo # Project notes and templates
            echo xnotes/
        ) >> "%TARGET_DIR%\.cursorignore"
    )
) else (
    (
        echo # Project notes and templates
        echo xnotes/
    ) > "%TARGET_DIR%\.cursorignore"
)

REM Créer ou mettre à jour le .cursorindexingignore
if exist "%TARGET_DIR%\.cursorindexingignore" (
    findstr /L /C:".cursor/templates/" "%TARGET_DIR%\.cursorindexingignore" >nul
    if errorlevel 1 (
        (
            echo.
            echo # Templates - accessible but not indexed
            echo .cursor/templates/
        ) >> "%TARGET_DIR%\.cursorindexingignore"
    )
) else (
    (
        echo # Templates - accessible but not indexed
        echo .cursor/templates/
    ) > "%TARGET_DIR%\.cursorindexingignore"
)

REM Supprimer le fichier test.txt s'il existe
if exist "%TARGET_DIR%\test.txt" (
    del "%TARGET_DIR%\test.txt"
)

echo.
echo Deployment Complete!
echo Core rules: %TARGET_DIR%\.cursor\rules\
echo Templates: %TARGET_DIR%\.cursor\templates\
echo Notepad templates: %TARGET_DIR%\xnotes\
echo Documentation: %TARGET_DIR%\docs\workflow-rules.md
echo Updated .gitignore, .cursorignore, and .cursorindexingignore
echo.
echo Next steps:
echo 1^. Review the documentation in docs\workflow-rules^.md
echo 2^. Choose your preferred workflow approach
echo 3^. Enable Cursor Notepads if using the flexible workflow option
echo 4^. To start a new project, use xnotes\project-idea-prompt^.md as a template
echo    to craft your initial message to the AI agent

endlocal
