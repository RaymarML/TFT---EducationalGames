<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="EducationalGames._Default" %>

<asp:Content ID="Style" ContentPlaceHolderID="StyleContent" runat="server"></asp:Content>

<asp:Content ID="GamesExpositorContent" ContentPlaceHolderID="MainContent" runat="server">
<div class="row mt-3 mt-lg-5 py-3 px-2 align-items-start justify-content-center">
    <asp:ListView ID="gameList" runat="server" 
        DataKeyNames="gameID" 
        GroupItemCount="1"
        ItemType="EducationalGames.Src.Models.Game" 
        SelectMethod="GetGames"
        OnCallingDataMethods="getGames_CallingDataMethods">
        <ItemTemplate>
            <div class="col-6 col-sm-3 mt-4">
                <div class="h-100 row justify-content-center align-items-center">
                    <a href="<%#:Item.url%>?q=<%#:Item.gameID%>">
                        <div class="row py-3 game-item-box align-items-center justify-content-center">
                            <h3 class="col-12 px-0 game-item-box-title"><%#:Item.name%></h3>
                        </div>
                    </a>
                </div>
            </div>
        </ItemTemplate>
    </asp:ListView>
</div>
</asp:Content>