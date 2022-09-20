<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/Game.master" AutoEventWireup="true" CodeBehind="Preguntas.aspx.cs" Inherits="EducationalGames.Views.Preguntas" %>
<%@ MasterType VirtualPath="~/MasterPages/Game.master" %>

<asp:Content ID="GameStyle" ContentPlaceHolderID="GameStyle" runat="server">
    <link rel="stylesheet" href="/Assets/Questions.css">
</asp:Content>

<asp:Content ID="GameTitle" ContentPlaceHolderID="GameTitle" runat="server">
<h1 class="game-title">Preguntas</h1>
</asp:Content>

<asp:Content ID="GameDescription" ContentPlaceHolderID="GameDescription" runat="server">
<h2 class="game-description">
    <span id="titleData">Responde a las preguntas.</span>
</h2>
</asp:Content>

<asp:Content ID="GameSettings" ContentPlaceHolderID="GameSettings" runat="server">
<div class="col-12 col-sm-6 col-lg-3 mt-2 mt-lg-0 px-0">
    <div class="row justify-content-center mx-0 align-items-center">
        <asp:UpdatePanel ID="test" runat="server">
            <ContentTemplate>
                <asp:CheckBox 
                    id="advanceDificulty" 
                    runat="server"
                    AutoPostBack="True"
                    Text="Dificultad avanzada"
                    TextAlign="Right"
                    CssClass="checkbox-control setting"
            OnCheckedChanged="toggleAdvanceDificulty"/>
            </ContentTemplate>
        </asp:UpdatePanel>
        <div class="pop-info">
            <i id="advanceDificultyInfo" class="ml-3 fa-solid fa-circle-info"></i>
        </div>
    </div>
</div>
<div class="col-12 col-sm-6 col-lg-3 mt-2 mt-lg-0 px-0">
    <div class="row justify-content-center mx-0 align-items-center">
        <label class="checkbox-control setting">
            <input id="multioptions" type="checkbox" />
            Multiopción
        </label>
        <div class="pop-info">
            <i id="multioptionsInfo" class="ml-3 fa-solid fa-circle-info"></i>
        </div>
    </div>
</div>
</asp:Content>

<asp:Content ID="GamePopups" ContentPlaceHolderID="GamePopups" runat="server">
<div id="multioptionsPopup" class="p-3 popup">
    <div class="row px-3">
        <h3 class="popup-header">Multiopción</h3>
    </div>
    <div class="row px-3 game-box-info">
        <p>Si una pregunta tiene varias respuestas y las marcas todas correctas
            obtienes +3 puntos por cada correcta</p>
    </div>
</div>
</asp:Content>

<asp:Content ID="GameContainer" ContentPlaceHolderID="GameContainer" runat="server">
    <div class="row mt-3 justify-content-center align-items-center">
        <div id="gameWrapper" class="col-4 text-center">
            <button id="startButton" class="start-button" type="button">Comenzar</button>
        </div>
    </div>
</asp:Content>

<asp:Content ID="GameScripts" ContentPlaceHolderID="GameScripts" runat="server">
    <script src="/Scripts/GameScripts/Providers/QuestionsProvider.js"></script>
    <script src="/Scripts/GameScripts/Games/PointingGames/PointableSet.js"></script>
    <script src="/Scripts/GameScripts/Games/PointingGames/PointableQuestionsSet.js"></script>
    <script>
        let gameManager = new GameManager(
            new QuestionsProvider(),
            new Settings(),
            new Timer(),
        );
        gameManager.game = new PointableQuestionsSet(
            "gameWrapper",
            gameManager.getGameManagerCallBack()
        );
        document.getElementById("startButton").addEventListener("click", () => { gameManager.startGame() });
    </script>
</asp:Content>