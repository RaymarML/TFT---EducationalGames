﻿<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/Game.master" AutoEventWireup="true" CodeBehind="SilabaTonica.aspx.cs" Inherits="EducationalGames.Views.SilabaTonica" %>
<%@ MasterType VirtualPath="~/MasterPages/Game.master" %>

<asp:Content ID="GameStyle" ContentPlaceHolderID="GameStyle" runat="server">
    <link rel="stylesheet" href="/Assets/StressedSyllable.css">
</asp:Content>

<asp:Content ID="GameTitle" ContentPlaceHolderID="GameTitle" runat="server">
<h1 class="game-title">Sílaba tónica</h1>
</asp:Content>

<asp:Content ID="GameDescription" ContentPlaceHolderID="GameDescription" runat="server">
<h2 class="game-description">Indica la sílaba tónica de la palabra.</h2>
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
            <input id="indicateType" type="checkbox" />
            Indicar tipo
        </label>
        <div class="pop-info">
            <i id="indicateTypeInfo" class="ml-3 fa-solid fa-circle-info"></i>
        </div>
    </div>
</div>
</asp:Content>


<asp:Content ID="GamePopups" ContentPlaceHolderID="GamePopups" runat="server">
<div id="indicateTypePopup" class="p-3 popup">
    <div class="row px-3">
        <h3 class="popup-header">Indicar tipo</h3>
    </div>
    <div class="row px-3 game-box-info">
        <p>
            Selecciona el tipo de palabra según su sílaba tónica.
            Si seleccionas el tipo correcto obtienes +7 puntos.
        </p>
    </div>
</div>
</asp:Content>

<asp:Content ID="GameContainer" ContentPlaceHolderID="GameContainer" runat="server">
    <div id="gameWrapper" class="row mt-5 justify-content-center align-items-center">
        <button id="startButton" class="start-button" type="button">Comenzar</button>
    </div>
    <div id="gameActions" class="row mb-2 mt-4 justify-content-center align-items-center">
        <button id="AcuteButton" class="d-none mx-3 game-button" type="button" type-id="0">Aguda</button>
        <button id="TrowelButton" class="d-none mx-3 game-button" type="button" type-id="1">Llana</button>
        <button id="EsdrujulaButton" class="d-none mx-3 game-button" type="button" type-id="2">Esdrújula</button>
    </div>
</asp:Content>


<asp:Content ID="GameScripts" ContentPlaceHolderID="GameScripts" runat="server">
    <script src="/Scripts/GameScripts/Providers/StressedSyllableProvider.js"></script>
    <script src="/Scripts/GameScripts/Games/PointingGames/PointableSet.js"></script>
    <script src="/Scripts/GameScripts/Games/PointingGames/PointableStressedSyllableSet.js"></script>
    <script>
        let gameManager = new GameManager(
            new StressedSyllableProvider(),
            new Settings(),
            new Timer(),
        );
        gameManager.game = new PointableStressedSyllableSet(
            "gameWrapper",
            gameManager.getGameManagerCallBack()
        );
        document.getElementById("startButton").addEventListener("click", () => { gameManager.startGame() });
    </script>
</asp:Content>

