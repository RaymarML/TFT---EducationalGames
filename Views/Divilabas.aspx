<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/Game.master" AutoEventWireup="true" CodeBehind="Divilabas.aspx.cs" Inherits="EducationalGames.Views.Divilabas" %>
<%@ MasterType VirtualPath="~/MasterPages/Game.master" %>

<asp:Content ID="GameStyle" ContentPlaceHolderID="GameStyle" runat="server">
    <link rel="stylesheet" href="/Assets/SyllableSeparator.css">
</asp:Content>

<asp:Content ID="GameTitle" ContentPlaceHolderID="GameTitle" runat="server">
<h1 class="game-title">Divílabas</h1>
</asp:Content>

<asp:Content ID="GameDescription" ContentPlaceHolderID="GameDescription" runat="server">
<h2 class="game-description">Separa las letras para formar las sílabas de la palabra.</h2>
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
                <input id="oppositeWay" type="checkbox" />
                Del revés
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
        <p>Si completas el ejercicio en sentido opuesto obtienes +7 puntos.</p>
    </div>
</div>
</asp:Content>

<asp:Content ID="GameContainer" ContentPlaceHolderID="GameContainer" runat="server">
    <div id="gameWrapper" class="row mt-5 justify-content-center align-items-center">
        <button id="startButton" class="start-button" type="button">Comenzar</button>
    </div>
</asp:Content>

<asp:Content ID="GameScripts" ContentPlaceHolderID="GameScripts" runat="server">
    <script src="/Scripts/GameScripts/Providers/SyllableSeparationProvider.js"></script>
    <script src="/Scripts/GameScripts/Games/PointingGames/PointableSet.js"></script>
    <script src="/Scripts/GameScripts/Games/PointingGames/PointableLetterSet.js"></script>
    <script>
        let gameManager = new GameManager(
            new SyllableSeparatorProvider(),
            new Settings(),
            new Timer(),
        );
        gameManager.game = new PointableLetterSet(
            "gameWrapper",
            gameManager.getGameManagerCallBack()
        );
        document.getElementById("startButton").addEventListener("click", () => { gameManager.startGame() });
    </script>
</asp:Content>
