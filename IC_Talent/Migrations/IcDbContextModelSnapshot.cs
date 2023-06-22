﻿// <auto-generated />
using System;
using IC_Talent.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace IC_Talent.Migrations
{
    [DbContext(typeof(IcDbContext))]
    partial class IcDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("IC_Talent.Models.Customer", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .HasMaxLength(150)
                        .IsUnicode(false)
                        .HasColumnType("varchar(150)");

                    b.Property<string>("Name")
                        .HasMaxLength(100)
                        .IsUnicode(false)
                        .HasColumnType("varchar(100)");

                    b.HasKey("Id")
                        .HasName("PK__Customer__3214EC07967FB3CB");

                    b.ToTable("Customer", (string)null);
                });

            modelBuilder.Entity("IC_Talent.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasMaxLength(100)
                        .IsUnicode(false)
                        .HasColumnType("varchar(100)");

                    b.Property<double?>("Price")
                        .HasColumnType("float");

                    b.HasKey("Id")
                        .HasName("PK__Product__3214EC07010A4AF8");

                    b.ToTable("Product", (string)null);
                });

            modelBuilder.Entity("IC_Talent.Models.Sale", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<int?>("CustomerId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("DateSold")
                        .HasColumnType("date");

                    b.Property<int?>("ProductId")
                        .HasColumnType("int");

                    b.Property<int?>("StoreId")
                        .HasColumnType("int");

                    b.HasKey("Id")
                        .HasName("PK__Sales__3214EC073E5F991C");

                    b.HasIndex("CustomerId");

                    b.HasIndex("ProductId");

                    b.HasIndex("StoreId");

                    b.ToTable("Sales");
                });

            modelBuilder.Entity("IC_Talent.Models.Store", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .HasMaxLength(150)
                        .IsUnicode(false)
                        .HasColumnType("varchar(150)");

                    b.Property<string>("Name")
                        .HasMaxLength(100)
                        .IsUnicode(false)
                        .HasColumnType("varchar(100)");

                    b.HasKey("Id")
                        .HasName("PK__Store__3214EC0767E32DA9");

                    b.ToTable("Store", (string)null);
                });

            modelBuilder.Entity("IC_Talent.Models.Sale", b =>
                {
                    b.HasOne("IC_Talent.Models.Customer", "Customer")
                        .WithMany("Sales")
                        .HasForeignKey("CustomerId")
                        .HasConstraintName("FK__Sales__CustomerI__2E1BDC42");

                    b.HasOne("IC_Talent.Models.Product", "Product")
                        .WithMany("Sales")
                        .HasForeignKey("ProductId")
                        .HasConstraintName("FK__Sales__ProductId__2D27B809");

                    b.HasOne("IC_Talent.Models.Store", "Store")
                        .WithMany("Sales")
                        .HasForeignKey("StoreId")
                        .HasConstraintName("FK__Sales__StoreId__2F10007B");

                    b.Navigation("Customer");

                    b.Navigation("Product");

                    b.Navigation("Store");
                });

            modelBuilder.Entity("IC_Talent.Models.Customer", b =>
                {
                    b.Navigation("Sales");
                });

            modelBuilder.Entity("IC_Talent.Models.Product", b =>
                {
                    b.Navigation("Sales");
                });

            modelBuilder.Entity("IC_Talent.Models.Store", b =>
                {
                    b.Navigation("Sales");
                });
#pragma warning restore 612, 618
        }
    }
}
