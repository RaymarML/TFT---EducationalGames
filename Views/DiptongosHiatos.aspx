<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/Game.master" AutoEventWireup="true" CodeBehind="DiptongosHiatos.aspx.cs" Inherits="EducationalGames.Views.DiptongosHiatos" %>
<%@ MasterType VirtualPath="~/MasterPages/Game.master" %>

<asp:Content ID="GameStyle" ContentPlaceHolderID="GameStyle" runat="server">
    <link rel="stylesheet" href="/Assets/DiphthongHiatus.css">
</asp:Content>

<asp:Content ID="GameTitle" ContentPlaceHolderID="GameTitle" runat="server">
<h1 class="game-title">Dhiatongos</h1>
</asp:Content>

<asp:Content ID="GameDescription" ContentPlaceHolderID="GameDescription" runat="server">
<h2 class="game-description">Señala las vocales que conforman diptongos e hiatos.</h2>
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
            <input id="hiatusTild" type="checkbox" />
            Diptongo u hiato
        </label>
        <div class="pop-info">
            <i id="hiatusTildInfo" class="ml-3 fa-solid fa-circle-info"></i>
        </div>
    </div>
</div>
</asp:Content>

<asp:Content ID="GamePopups" ContentPlaceHolderID="GamePopups" runat="server">
<div id="hiatusTildPopup" class="p-3 popup">
    <div class="row px-3">
        <h3 class="popup-header">Indicar diptongo o hiato</h3>
    </div>
    <div class="row px-3 game-box-info">
        <p>Si inidcar si la sílaba tiene diptongo o hiato +7 puntos.</p>
    </div>
</div>
</asp:Content>

<asp:Content ID="GameContainer" ContentPlaceHolderID="GameContainer" runat="server">
    <div id="gameWrapper" class="row mt-5 justify-content-center align-items-center">
        <button id="startButton" class="start-button" type="button">Comenzar</button>
    </div>
    <div id="gameActions" class="row mb-3 mt-4 justify-content-center align-items-center">
        <button id="noneButton" class="d-none mx-3 game-button" type="button" data-id="-1">Ninguna</button>
        <button id="tripthongButton" class="d-none mx-3 game-button" type="button" type-id="3">Triptongo</button>
        <button id="dipthongButton" class="d-none mx-3 game-button" type="button" type-id="2">Diptongo</button>
        <button id="hiatusButton" class="d-none mx-3 game-button" type="button" type-id="1">Hiato</button>
    </div>
</asp:Content>

<asp:Content ID="GameScripts" ContentPlaceHolderID="GameScripts" runat="server">
    <script src="/Scripts/GameScripts/Providers/DiphthongHiatusProvider.js"></script>
    <script src="/Scripts/GameScripts/Games/PointingGames/PointableSet.js"></script>
    <script src="/Scripts/GameScripts/Games/PointingGames/PointableDiphthongHiatusSet.js"></script>
    <script>
        let gameManager = new GameManager(
            new DiphthongHiatusProvider(),
            new Settings(),
            new Timer(),
        );
        gameManager.game = new PointableDipthongHiatusSet(
            "gameWrapper",
            gameManager.getGameManagerCallBack()
        );
        document.getElementById("startButton").addEventListener("click", () => { gameManager.startGame() });
    </script>
</asp:Content>
