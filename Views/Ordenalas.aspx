<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/Game.master" AutoEventWireup="true" CodeBehind="Ordenalas.aspx.cs" Inherits="EducationalGames.Views.Ordenalas" %>
<%@ MasterType VirtualPath="~/MasterPages/Game.master" %>

<asp:Content ID="GameStyle" ContentPlaceHolderID="GameStyle" runat="server">
    <link rel="stylesheet" href="/Assets/WordSort.css">
</asp:Content>

<asp:Content ID="GameTitle" ContentPlaceHolderID="GameTitle" runat="server">
<h1 class="game-title">Ordénalas</h1>
</asp:Content>

<asp:Content ID="GameDescription" ContentPlaceHolderID="GameDescription" runat="server">
<h2 class="game-description">Órdena las palabras alfabéticamente.</h2>
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
<div class="col-12 col-sm-6 col-lg-3 px-0">
    <div class="row justify-content-center mx-0 align-items-center">
        <label class="checkbox-control setting">
            <input id="oppositeWay" type="checkbox" />
            Cantidad de sílabas
        </label>
        <div class="pop-info">
            <i id="oppositeWayInfo" class="ml-3 fa-solid fa-circle-info"></i>
        </div>
    </div>
</div>
</asp:Content>

<asp:Content ID="GamePopups" ContentPlaceHolderID="GamePopups" runat="server">
<div id="oppositeWayPopup" class="p-3 popup">
    <div class="row px-3">
        <h3 class="popup-header">Del revés</h3>
    </div>
    <div class="row px-3 game-box-info">
        <p>
            Si ordenas las palabras por su cantidad de sílabas de menor a mayor, obtienes +7 puntos.
            En caso de tener misma cantidad de sílabas ordénalas alfabeticamente.
        </p>
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
    <script src="/Scripts/GameScripts/Providers/WordSortProvider.js"></script>
    <script src="/Scripts/GameScripts/Games/SortingGames/Sortable.min.js"></script>
    <script src="/Scripts/GameScripts/Games/SortingGames/SorteableSet.js"></script>
    <script src="/Scripts/GameScripts/Factories/SorteableSetFactory.js"></script>
    <script>
        let gameManager = new GameManager(
            new WordSortProvider(),
            new Settings(),
            new Timer(),
        );
        let gameFactory = new SorteableSetFactory();
        gameManager.game = gameFactory.getSorter("words", gameManager.getGameManagerCallBack());
        document.getElementById("startButton").addEventListener("click", () => { gameManager.startGame() });
    </script>
</asp:Content>
